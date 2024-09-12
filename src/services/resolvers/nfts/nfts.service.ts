import { Injectable, Logger } from "@nestjs/common"
import { BlockchainNftBaseService } from "../../blockchain"
import { GetNftsByOwnerAddressArgs, GetNftsByOwnerAddressResponse, GetNftsByTokenIdsArgs, GetNftsByTokenIdsResponse } from "./dtos"
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

    public async getNftsByOwnerAddress({
        input,
        filter,
    }: GetNftsByOwnerAddressArgs): Promise<GetNftsByOwnerAddressResponse> {
        const { accountAddress } = { ...input }
        if (!accountAddress) throw new AccountAddressNotFoundException(accountAddress)

        let { nftKey, network, chainKey } = { ...input }
        const { skip, take } = { ...filter }
        
        chainKey = chainKey || defaultChainKey
        nftKey = nftKey || defaultNftKey
        network = network || Network.Testnet

        const nftAddress =
      blockchainConfig()[chainKey].nfts[nftKey].addresses[network]
        return await this.blockchainNftBaseService.getNftsByOwnerAddress({
            accountAddress,
            network,
            chainKey,
            nftAddress,
            skip,
            take,
        })
    }

    public async getNftsByTokenIds({
        input,
    }: GetNftsByTokenIdsArgs): Promise<GetNftsByTokenIdsResponse> {
        const { tokenIds } = { ...input }
        let { nftKey, network, chainKey } = { ...input }
        
        chainKey = chainKey || defaultChainKey
        nftKey = nftKey || defaultNftKey
        network = network || Network.Testnet

        const nftAddress =
      blockchainConfig()[chainKey].nfts[nftKey].addresses[network]
      
        return await this.blockchainNftBaseService.getNftsByTokenIds({
            tokenIds,
            network,
            chainKey,
            nftAddress,
        }) 
    }
}
