import { Injectable, Logger } from "@nestjs/common"
import { BlockchainNftBaseService } from "../../blockchain"
import {
    MINT_NFT_RESPONSE_SUCCESS_MESSAGE,
    MintNftRequestBody,
    MintNftResponse,
} from "./dtos"
import { defaultChainKey, defaultNetwork, defaultNftCollectionKey } from "@/config"

@Injectable()
export class NftControllerService {
    private readonly logger = new Logger(NftControllerService.name)

    constructor(
    private readonly blockchainNftBaseService: BlockchainNftBaseService,
    ) {}

    public async mintNft({
        nftCollectionKey,
        tokenId,
        imageUrl,
        properties,
        chainKey,
        network,
        toAddress,
    }: MintNftRequestBody): Promise<MintNftResponse> {
        network = network || defaultNetwork
        nftCollectionKey = nftCollectionKey || defaultNftCollectionKey
        chainKey = chainKey || defaultChainKey

        //mint nft
        const { transactionHash, tokenId: _tokenId } =
      await this.blockchainNftBaseService.mintNft({
          chainKey,
          imageUrl,
          nftCollectionKey,
          network,
          properties,
          toAddress,
          tokenId,
      })
        this.logger.debug(`Minted nft with tokenId: ${_tokenId}`)
        this.logger.debug(`Transaction hash: ${transactionHash}`)
        return {
            message: MINT_NFT_RESPONSE_SUCCESS_MESSAGE,
            data: {
                transactionHash,
                tokenId: _tokenId,
            },
        }
    }
}
