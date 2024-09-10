import { Injectable, Logger } from "@nestjs/common"
import { GetNftsParams } from "../common"
import { _getNfts } from "./get-nfts.nft"
import { Network } from "@/config"

export interface BlockchainNftBaseServiceConstructorParams {
    nftAddress: string,
    chainKey: string,
    network: Network
}

@Injectable()
export class BlockchainNftBaseService {
    private readonly logger = new Logger(BlockchainNftBaseService.name)

    constructor() {}

    public getNfts(params: GetNftsParams) {
        return _getNfts(params)
    }
}

