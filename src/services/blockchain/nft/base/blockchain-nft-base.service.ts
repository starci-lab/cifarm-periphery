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
import { GetNftByTokenIdParams, _getNftByTokenId } from "./get-nfts-by-token-id.nft"
import { CIDService } from "../../../base"

export interface BlockchainNftBaseServiceConstructorParams {
  nftCollectionId: string;
  chainKey: string;
  network: Network;
}

@Injectable()
export class BlockchainNftBaseService {
    private readonly logger = new Logger(BlockchainNftBaseService.name)

    constructor(
        private readonly cidService: CIDService,
    ) {}

    public getNftsByOwnerAddress(params: GetNftsByOwnerAddressParams) {
        return _getNftsByOwnerAddress(params, {
            cidService: this.cidService,
        })
    }

    public getNftsByTokenIds(params: GetNftsByTokenIdsParams) {
        return _getNftsByTokenIds(params, {
            cidService: this.cidService,
        })
    }

    public getNftByTokenId(params: GetNftByTokenIdParams) {
        return _getNftByTokenId(params, {
            cidService: this.cidService,
        })
    }
}
