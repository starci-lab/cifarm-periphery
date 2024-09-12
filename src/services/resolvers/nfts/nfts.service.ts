import { Injectable, Logger } from "@nestjs/common"
import { BlockchainNftBaseService } from "../../blockchain"
import { GetNftsArgs, GetNftsResponse } from "./dtos"
import {
    Network,
    blockchainConfig,
    defaultChainKey,
    defaultNftKey,
} from "@/config"
import { AccountAddressNotFoundException } from "@/exceptions"

@Injectable()
export class NftsResolverService {
    private readonly logger = new Logger(NftsResolverService.name)

    constructor(private blockchainNftBaseService: BlockchainNftBaseService) {}

    public async getNfts({
        input,
        filter,
    }: GetNftsArgs): Promise<GetNftsResponse> {
        const { accountAddress } = { ...input }
        if (!accountAddress) throw new AccountAddressNotFoundException(accountAddress)

        let { nftKey, network, chainKey } = { ...input }
        let { skip, take } = { ...filter }
        
        chainKey = chainKey || defaultChainKey
        nftKey = nftKey || defaultNftKey
        skip = skip || 0
        take = take || 5
        network = network || Network.Testnet

        const nftAddress =
      blockchainConfig()[chainKey].nfts[nftKey].addresses[network]
        return await this.blockchainNftBaseService.getNfts({
            accountAddress,
            network,
            chainKey,
            nftAddress,
            skip,
            take,
        })
    }
}
