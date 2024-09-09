import { Injectable, Logger } from "@nestjs/common"
import { GetNftsParams } from "./types"
import { _getNfts } from "./get-nfts.nft"

@Injectable()
export class BlockchainNftService {
    private readonly logger = new Logger(BlockchainNftService.name)

    constructor() {}

    public getNfts(params: GetNftsParams) {
        console.log("called")
        return _getNfts(params)
    }
}

