import { Injectable, Logger } from "@nestjs/common"
import { BlockchainNftBaseService } from "../../blockchain"
import {
    GetNftByTokenIdArgs,
    GetNftsByOwnerAddressArgs,
    GetNftsByOwnerAddressResponse,
    GetNftsByTokenIdsArgs,
    GetNftsByTokenIdsResponse,
    NftDataResponse,
} from "./dtos"
import {
    defaultChainKey,
    defaultNetwork,
    defaultNftCollectionKey,
} from "@/config"
import { AccountAddressNotFoundException } from "@/exceptions"

@Injectable()
export class NftResolverService {
    private readonly logger = new Logger(NftResolverService.name)

    constructor(private blockchainNftBaseService: BlockchainNftBaseService) {}

    public async getNftsByOwnerAddress({
        input,
        filter,
    }: GetNftsByOwnerAddressArgs): Promise<GetNftsByOwnerAddressResponse> {
        const { accountAddress } = { ...input }
        if (!accountAddress)
            throw new AccountAddressNotFoundException(accountAddress)

        let { nftCollectionKey, network, chainKey } = { ...input }
        const { skip, take } = { ...filter }

        chainKey = chainKey || defaultChainKey
        nftCollectionKey = nftCollectionKey || defaultNftCollectionKey
        network = network  || defaultNetwork

        return await this.blockchainNftBaseService.getNftsByOwnerAddress({
            accountAddress,
            network,
            chainKey,
            nftCollectionKey,
            skip,
            take,
        })
    }

    public async getNftsByTokenIds({
        input,
    }: GetNftsByTokenIdsArgs): Promise<GetNftsByTokenIdsResponse> {
        const { tokenIds } = { ...input }
        let { nftCollectionKey, network, chainKey } = { ...input }

        chainKey = chainKey || defaultChainKey
        nftCollectionKey = nftCollectionKey || defaultNftCollectionKey
        network = network  || defaultNetwork
        
        return await this.blockchainNftBaseService.getNftsByTokenIds({
            tokenIds,
            network,
            chainKey,
            nftCollectionKey,
        })
    }

    public async getNftByTokenId({ input }: GetNftByTokenIdArgs): Promise<NftDataResponse> {
        const { tokenId } = { ...input }
        let { nftCollectionKey, network, chainKey } = { ...input }

        chainKey = chainKey || defaultChainKey
        nftCollectionKey = nftCollectionKey || defaultNftCollectionKey
        network = network || defaultNetwork

        try {
            return await this.blockchainNftBaseService.getNftByTokenId({
                tokenId,
                network,
                chainKey,
                nftCollectionKey,
            })
        } catch (ex) {
            this.logger.error(ex)
            return null
        }
        
    }
}
