
import { Injectable, Logger } from "@nestjs/common"
import { BlockchainNftBaseService } from "../../blockhains"
import { GetNftsInput, GetNftsResult } from "./dtos"
import { blockchainConfig } from "@/config"

@Injectable()
export class NftsResolverService {
    private readonly logger = new Logger(NftsResolverService.name)

    constructor(
        private blockchainNftBaseService: BlockchainNftBaseService
    ) {}

    public async getNfts({ accountAddress, nftKey, network, chainKey }: GetNftsInput): Promise<GetNftsResult> {
        const nftAddress = blockchainConfig()[chainKey].nfts[nftKey].addresses[network]
        const records = await this.blockchainNftBaseService.getNfts({ accountAddress, network, chainKey, nftAddress })
        return { records, metadata: { count: records.length }}
    }
}

