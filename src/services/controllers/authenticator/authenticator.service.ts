import { Inject, Injectable, Logger } from "@nestjs/common"
import {
    GetFakeSignatureResponse,
    GetFakeSignatureRequestBody,
    RequestMessageResponse,
    VerifyMessageRequestBody,
    VerifyMessageResponse,
    VERIFY_MESSAGE_RESPONSE_SUCCESS_MESSAGE,
    VERIFY_MESSAGE_RESPONSE_FAILED_MESSAGE,
    REQUEST_MESSAGE_RESPONSE_SUCCESS_MESSAGE,
    GET_FAKE_SIGNATURE_RESPONSE_SUCCESS_MESSAGE,
    AuthorizeTelegramContext,
    AuthorizeTelegramResponse,
    AUTHORIZE_TELEGRAM_RESPONSE_SUCCESS_MESSAGE,
} from "./dtos"
import { randomUUID } from "crypto"
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager"
import {
    CacheNotFound,
    ChainKeyNotFoundException,
    InvalidSignatureException,
} from "@/exceptions"
import {
    Network,
    Platform,
    chainKeyToPlatform,
    defaultChainKey,
    envConfig,
} from "@/config"
import {
    EvmAuthService,
    AptosAuthService,
    SolanaAuthService,
    AlgorandAuthService,
    PolkadotAuthService,
} from "../../blockchain"
import { Sha256Service } from "@/services/base"
import { InjectRepository } from "@nestjs/typeorm"
import { UsersEntity } from "@/database"
import { Repository } from "typeorm"
import { encode } from "bs58"
import { defaultBotType } from "@/guards"

@Injectable()
export class AuthenticatorControllerService {
    private readonly logger = new Logger(AuthenticatorControllerService.name)

    constructor(
    private readonly evmAuthService: EvmAuthService,
    private readonly aptosAuthService: AptosAuthService,
    private readonly solanaAuthService: SolanaAuthService,
    private readonly sha256Service: Sha256Service,
    private readonly algorandAuthService: AlgorandAuthService,
    private readonly polkadotAuthService: PolkadotAuthService,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    ) {}

    public async requestMessage(): Promise<RequestMessageResponse> {
        const message = randomUUID()
        //tempt inf for testing
        await this.cacheManager.set(message, true, 0)
        return {
            message: REQUEST_MESSAGE_RESPONSE_SUCCESS_MESSAGE,
            data: {
                message,
            },
        }
    }

    public async verifyMessage({
        message,
        signature,
        publicKey,
        chainKey,
        network,
    }: VerifyMessageRequestBody): Promise<VerifyMessageResponse> {
        const valid = await this.cacheManager.get(message)
        if (!valid) {
            throw new CacheNotFound(message)
        }
        console.log(message, signature, publicKey)
        //await this.cacheManager.del(message)
        let result = false
        let address = publicKey

        chainKey = chainKey ?? defaultChainKey
        network = network ?? Network.Testnet
        const platform = chainKeyToPlatform(chainKey)
        switch (platform) {
        case Platform.Evm: {
            result = this.evmAuthService.verifyMessage({
                message,
                signature,
                publicKey,
            })
            break
        }
        case Platform.Solana: {
            result = this.solanaAuthService.verifyMessage({
                message,
                signature,
                publicKey,
            })
            break
        }
        case Platform.Aptos: {
            result = this.aptosAuthService.verifyMessage({
                message,
                signature,
                publicKey,
            })
            address = this.aptosAuthService.toAddress(publicKey)
            break
        }
        case Platform.Algorand: {
            result = this.algorandAuthService.verifyMessage({
                message,
                signature,
                publicKey,
            })
            break
        }
        case Platform.Polkadot: {
            result = this.polkadotAuthService.verifyMessage({
                message,
                signature,
                publicKey,
            })
            break
        }
        default:
            this.logger.error(`Unknown platform: ${platform}`)
            result = false
            break
        }
        if (!result) throw new InvalidSignatureException(signature)

        const authenticationId = this.sha256Service.hash(
            address,
            chainKey,
            network,
        )
        return {
            message: result
                ? VERIFY_MESSAGE_RESPONSE_SUCCESS_MESSAGE
                : VERIFY_MESSAGE_RESPONSE_FAILED_MESSAGE,
            data: { result, address, authenticationId },
        }
    }

    public async getFakeSignature({
        accountNumber,
        chainKey,
        network,
    }: GetFakeSignatureRequestBody): Promise<GetFakeSignatureResponse> {
        network = network || Network.Testnet
        const {
            data: { message },
        } = await this.requestMessage()
        chainKey = chainKey ?? defaultChainKey
        accountNumber = accountNumber ?? 0

        const platform = chainKeyToPlatform(chainKey)
        switch (platform) {
        case Platform.Evm: {
            const { privateKey, address } =
          this.evmAuthService.getFakeKeyPair(accountNumber)
            const signature = this.evmAuthService.signMessage(message, privateKey)
            return {
                message: GET_FAKE_SIGNATURE_RESPONSE_SUCCESS_MESSAGE,
                data: {
                    message,
                    publicKey: address,
                    signature,
                    chainKey,
                    network,
                    telegramInitDataRaw: envConfig().secrets.telegram.mockAuthorization,
                    botType: defaultBotType,
                },
            }
        }
        case Platform.Solana: {
            const { publicKey, secretKey } =
          this.solanaAuthService.getFakeKeyPair(accountNumber)
            const signature = this.solanaAuthService.signMessage(
                message,
                encode(secretKey),
            )
            return {
                message: GET_FAKE_SIGNATURE_RESPONSE_SUCCESS_MESSAGE,
                data: {
                    message,
                    publicKey: publicKey.toBase58(),
                    signature,
                    chainKey,
                    network,
                    telegramInitDataRaw: envConfig().secrets.telegram.mockAuthorization,
                    botType: defaultBotType,
                },
            }
        }
        case Platform.Aptos: {
            const { publicKey, privateKey } =
          this.aptosAuthService.getFakeKeyPair(accountNumber)
            const signature = this.aptosAuthService.signMessage(
                message,
                privateKey.toString(),
            )
            return {
                message: GET_FAKE_SIGNATURE_RESPONSE_SUCCESS_MESSAGE,
                data: {
                    message,
                    publicKey: publicKey.toString(),
                    signature,
                    chainKey,
                    network,
                    telegramInitDataRaw: envConfig().secrets.telegram.mockAuthorization,
                    botType: defaultBotType,
                },
            }
        }
        case Platform.Algorand: {
            const { addr, sk } =
          this.algorandAuthService.getFakeKeyPair(accountNumber)
            const signature = this.algorandAuthService.signMessage(
                message,
                Buffer.from(sk).toString("base64"),
            )
            return {
                message: GET_FAKE_SIGNATURE_RESPONSE_SUCCESS_MESSAGE,
                data: {
                    message,
                    publicKey: addr.toString(),
                    signature,
                    chainKey,
                    network,
                    telegramInitDataRaw: envConfig().secrets.telegram.mockAuthorization,
                    botType: defaultBotType,
                },
            }
        }
        case Platform.Polkadot: {
            const { publicKey, privateKey } =
          this.polkadotAuthService.getFakeKeyPair(accountNumber)

            const signature = this.algorandAuthService.signMessage(
                message,
                privateKey.toString(),
            )

            return {
                message: GET_FAKE_SIGNATURE_RESPONSE_SUCCESS_MESSAGE,
                data: {
                    message,
                    publicKey: publicKey.toString(),
                    signature,
                    chainKey,
                    network,
                    telegramInitDataRaw: envConfig().secrets.telegram.mockAuthorization,
                    botType: defaultBotType,
                },
            }
        }
        default:
            throw new ChainKeyNotFoundException(chainKey)
        }
    }

    public async authorizeTelegram({
        telegramData,
    }: AuthorizeTelegramContext): Promise<AuthorizeTelegramResponse> {
        const user = await this.usersRepository.findOne({
            where: {
                telegramId: telegramData.userId.toString(),
            },
        })
        if (!user) {
            const x = await this.usersRepository.save({
                telegramId: telegramData.userId.toString(),
                username: telegramData.username,
            })
            console.log(x)
        }

        return {
            data: {
                telegramData,
            },
            message: AUTHORIZE_TELEGRAM_RESPONSE_SUCCESS_MESSAGE,
        }
    }
}
