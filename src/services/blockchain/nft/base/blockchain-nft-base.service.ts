import { Injectable, Logger } from "@nestjs/common"
import {
    GetNftsByOwnerAddressParams,
    _getNftsByOwnerAddress,
} from "./get-nfts-by-owner-address.nft"
import { Network } from "@/config"
import {
    GetNftsByTokenIdsParams,
    _getNftsByTokenIds,
} from "./get-nfts-by-token-ids.nft"

export interface BlockchainNftBaseServiceConstructorParams {
  nftAddress: string;
  chainKey: string;
  network: Network;
}

@Injectable()
export class BlockchainNftBaseService {
    private readonly logger = new Logger(BlockchainNftBaseService.name)

    constructor() {}

    public getNftsByOwnerAddress(params: GetNftsByOwnerAddressParams) {
        return _getNftsByOwnerAddress(params)
    }

    public getNftsByTokenIds(params: GetNftsByTokenIdsParams) {
        return _getNftsByTokenIds(params)
    }
}
