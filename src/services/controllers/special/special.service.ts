import { NearAccountsService } from "../../blockchain"
import { Injectable, Logger } from "@nestjs/common"
import {
    CreateNearAccountRequestBody,
    CreateNearAccountResponse,
} from "./dtos"
import { CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE } from "../authenticator"
import { defaultNetwork } from "@/config"

//temporatory host this service on cifarm periphery, will be move to ciwallet periphery
//better solution is create a same template, then host this service in a separate periphery
@Injectable()
export class SpecialControllerService {
    private readonly logger = new Logger(SpecialControllerService.name)
    constructor(private readonly nearAccountsService: NearAccountsService) {}

    async createNearAcount({
        network,
        subdomain,
        publicKey,
    }: CreateNearAccountRequestBody): Promise<CreateNearAccountResponse> {
        network = network || defaultNetwork
        
        const { transactionHash } = await this.nearAccountsService.createAccount({
            subdomain,
            publicKey,
            network,
        })

        return {
            message: CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE,
            data: {
                transactionHash,
            },
        }
    }
}
