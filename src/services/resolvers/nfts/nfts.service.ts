
import { Injectable, Logger } from "@nestjs/common"
import { BlockchainNftService } from "../../blockhains"
import { GetNftsInput, GetNftsResult } from "./dtos"
import { blockchainConfig } from "@/config"

@Injectable()
export class NftsResolverService {
    private readonly logger = new Logger(NftsResolverService.name)

    constructor(
        private blockchainNftService: BlockchainNftService
    ) {}

    public async getNfts({ accountAddress, nftKey, network, chainKey }: GetNftsInput): Promise<GetNftsResult> {
        console.log(accountAddress, nftKey, network)
        const nftAddress = blockchainConfig()[chainKey].nfts[nftKey].addresses[network]
        const data = await this.blockchainNftService.getNfts({ accountAddress, network, chainKey, nftAddress })
        return { records : [], metadata: { count: 1}}
    }
}

