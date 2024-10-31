import {
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common"
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
    SignInRequestBody,
    SignInResponse,
    SIGN_IN_RESPONSE_SUCCESS_MESSAGE,
    CreateAccountRequestBody,
    CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE,
    CreateAccountResponse,
    UpdateAccountRequestBody,
    UpdateAccountResponse,
    UPDATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE,
    DeleteAccountRequestBody,
    DeleteAccountResponse,
    DELETE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE,
} from "./dtos"
import { randomUUID } from "crypto"
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager"
import {
    AccountNotFoundException,
    CacheNotFound,
    ChainKeyNotFoundException,
    InvalidSignatureException,
    UsernameAlreadyExistsException,
} from "@/exceptions"
import {
    Network,
    Platform,
    SupportedChainKey,
    chainKeyToPlatform,
    defaultChainKey,
    defaultNetwork,
    envConfig,
} from "@/config"
import {
    EvmAuthService,
    AptosAuthService,
    SolanaAuthService,
    AlgorandAuthService,
    PolkadotAuthService,
    NearAuthService,
} from "../../blockchain"
import { Sha256Service } from "@/services/base"
import { Account, AccountEntity, RoleEntity, UserEntity } from "@/database"
import { DataSource, In } from "typeorm"
import { encode } from "bs58"
import { defaultBotType } from "@/guards"
import { JwtService } from "@nestjs/jwt"

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
    private readonly nearAuthService: NearAuthService,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    private readonly dataSource: DataSource,

    private readonly jwtService: JwtService,
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
        case Platform.Near: {
            result = this.nearAuthService.verifyMessage({
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
            publicKey,
            chainKey,
            network,
        )
        return {
            message: result
                ? VERIFY_MESSAGE_RESPONSE_SUCCESS_MESSAGE
                : VERIFY_MESSAGE_RESPONSE_FAILED_MESSAGE,
            data: { result, authenticationId },
        }
    }

    public async getFakeSignature({
        accountNumber,
        chainKey,
        network,
    }: GetFakeSignatureRequestBody): Promise<GetFakeSignatureResponse> {
        network = network || defaultNetwork
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
                    accountAddress: address,
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
                    accountAddress: publicKey.toBase58(),
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
                    accountAddress: this.aptosAuthService.toAddress(publicKey.toString()),
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
                    accountAddress: addr.toString(),
                },
            }
        }
        case Platform.Polkadot: {
            const { publicKey, privateKey } =
          this.polkadotAuthService.getFakeKeyPair(accountNumber)

            const signature = this.polkadotAuthService.signMessage(
                message,
                privateKey.toString(),
                publicKey.toString(),
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
                    accountAddress: publicKey.toString(),
                },
            }
        }
        case Platform.Near: {
            const { publicKey, secretKey } =
          this.nearAuthService.getFakeKeyPair(accountNumber)
            const signature = this.nearAuthService.signMessage(
                message,
                secretKey.toString(),
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
                    accountAddress: `example.${envConfig().chainCredentials[SupportedChainKey.Near].creator[network].accountId}`,
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
        const user = await this.dataSource.manager.findOne(UserEntity, {
            where: {
                telegramId: telegramData.userId.toString(),
            },
        })
        if (!user) {
            await this.dataSource.manager.save(UserEntity, {
                telegramId: telegramData.userId.toString(),
                username: telegramData.username,
            })
        }

        return {
            data: {
                telegramData,
            },
            message: AUTHORIZE_TELEGRAM_RESPONSE_SUCCESS_MESSAGE,
        }
    }

    public async signIn({
        password,
        username,
    }: SignInRequestBody): Promise<SignInResponse> {
        const hashedPassword = this.sha256Service.hash(password)
        const account = await this.dataSource.manager.findOne(AccountEntity, {
            where: {
                username,
                hashedPassword,
            },
            relations: {
                roles: true,
            },
        })
        const flatAccount: Account = {
            ...account.toPlain<Omit<AccountEntity, "roles">>(),
            roles: account.roles.map((role) => role.role),
        }
        if (!account) {
            throw new AccountNotFoundException()
        }
        const jwtToken = this.jwtService.sign(flatAccount, {
            expiresIn: envConfig().secrets.jwt.expiresIn,
            secret: envConfig().secrets.jwt.secret,
        })
        return {
            data: {
                jwtToken,
            },
            message: SIGN_IN_RESPONSE_SUCCESS_MESSAGE,
        }
    }

    public async createAccount({
        password,
        roles,
        username,
    }: CreateAccountRequestBody): Promise<CreateAccountResponse> {
        try {
            const hashedPassword = this.sha256Service.hash(password)
            //found username
            const foundAccount = await this.dataSource.manager.findOne(AccountEntity, {
                where: {
                    username,
                },
            })
            if (foundAccount) {
                throw new UsernameAlreadyExistsException(username)
            }
            const { id } = await this.dataSource.manager.save(AccountEntity, {
                username,
                hashedPassword,
                roles: roles.map((role) => ({
                    role,
                })),
            })
            return {
                data: {
                    id,
                },
                message: CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE,
            }
        } catch (ex) {
            this.logger.error(ex)
            throw ex
        }  
    }

    public async updateAccount({
        password,
        roles,
        username,
        id,
    }: UpdateAccountRequestBody): Promise<UpdateAccountResponse> {
        const foundRoles = await this.dataSource.manager.find(RoleEntity, {
            where: {
                accountId: id,
            },
        })

        const rolesToDelete = foundRoles.filter(
            (role) => !roles.includes(role.role),
        )

        const rolesToAdd = roles.filter(
            (role) => !foundRoles.map((role) => role.role).includes(role),
        )

        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            //delete roles
            await queryRunner.manager.delete(RoleEntity, {
                accountId: id,
                role: In(rolesToDelete.map((role) => role.role)),
            })

            //add roles
            await queryRunner.manager.save(
                RoleEntity,
                rolesToAdd.map((role) => ({
                    accountId: id,
                    role,
                })),
            )

            //update account
            const hashedPassword = this.sha256Service.hash(password)
            await this.dataSource.manager.update(AccountEntity, id, {
                username,
                hashedPassword,
            })
            await queryRunner.commitTransaction()
            return {
                message: UPDATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE,
            }
        } catch (ex) {
            this.logger.error(ex)
            await queryRunner.rollbackTransaction()
            throw new InternalServerErrorException(ex)
        }
    }

    public async deleteAccount({
        id,
    }: DeleteAccountRequestBody): Promise<DeleteAccountResponse> {
        await this.dataSource.manager.delete(AccountEntity, id)
        return {
            message: DELETE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE,
        }
    }
}
