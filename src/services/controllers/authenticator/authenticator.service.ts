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
} from "./dtos"
import { randomUUID } from "crypto"
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager"
import {
    CacheNotFound,
    ChainKeyNotFoundException,
    InvalidSignatureException,
} from "@/exceptions"
import { Platform, chainKeyToPlatform, defaultChainKey } from "@/config"
import { EvmAuthService, AptosAuthService } from "../../blockchain"

@Injectable()
export class AuthenticatorControllerService {
    private readonly logger = new Logger(AuthenticatorControllerService.name)

    constructor(
    private readonly evmAuthService: EvmAuthService,
    private readonly aptosAuthService: AptosAuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    public async requestMessage(): Promise<RequestMessageResponse> {
        
        const message = `Welcome to CiFarm!
Please sign the following message to proceed.
This action does not initiate a blockchain transaction and will not incur any gas fees.
Nonce: ${randomUUID()}`

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
    }: VerifyMessageRequestBody): Promise<VerifyMessageResponse> {
        const valid = await this.cacheManager.get(message)
        if (!valid) {
            throw new CacheNotFound(message)
        }
        //await this.cacheManager.del(message)
        let result = false
        let address = publicKey

        chainKey = chainKey ?? defaultChainKey
        const platform = chainKeyToPlatform(chainKey)
        switch (platform) {
        case Platform.Evm:
            result = this.evmAuthService.verifyMessage({
                message,
                signature,
                publicKey,
            })
            break
        case Platform.Aptos:
            result = this.aptosAuthService.verifyMessage({
                message,
                signature,
                publicKey,
            })
            address = this.aptosAuthService.toAddress(publicKey)
            break
        default:
            this.logger.error(`Unknown platform: ${platform}`)
            result = false
            break
        }
        if (!result) throw new InvalidSignatureException(signature)

        return {
            message: result
                ? VERIFY_MESSAGE_RESPONSE_SUCCESS_MESSAGE
                : VERIFY_MESSAGE_RESPONSE_FAILED_MESSAGE,
            data: { result, address },
        }
    }

    public async getFakeSignature({
        accountNumber,
        chainKey,
    }: GetFakeSignatureRequestBody): Promise<GetFakeSignatureResponse> {
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
                },
            }
        }
        default:
            throw new ChainKeyNotFoundException(chainKey)
        }
    }
}
