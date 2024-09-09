import { Injectable, Logger } from "@nestjs/common"
import { GetNftsParams } from "../types.nft"
import { _getNfts } from "./get-nfts.nft"

@Injectable()
export class BlockchainNftBaseService {
    private readonly logger = new Logger(BlockchainNftBaseService.name)

    constructor() {}

    public getNfts(params: GetNftsParams) {
        return _getNfts(params)
    }
}

