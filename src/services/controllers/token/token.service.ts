import { Injectable, Logger } from "@nestjs/common"
import { BlockchainTokenService } from "../../blockchain"
import { MINT_RESPONSE_SUCCESS_MESSAGE, MintRequestBody, MintResponse } from "./dtos"

@Injectable()
export class TokenControllerService {
    private readonly logger = new Logger(TokenControllerService.name)

    constructor(
        private readonly blockchainTokenService: BlockchainTokenService
    ) {}

    public async mint({ mintAmount, minterPrivateKey, tokenAddress, chainKey, network, toAddress }: MintRequestBody): Promise<MintResponse> {
        const { transactionHash } = await this.blockchainTokenService.mint({
            chainKey,
            mintAmount,
            minterPrivateKey,
            network,
            toAddress,
            tokenAddress
        })
        return {
            message: MINT_RESPONSE_SUCCESS_MESSAGE,
            data: {
                transactionHash,
            },
        }
    }
}
