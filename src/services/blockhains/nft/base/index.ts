import { Injectable, Logger } from "@nestjs/common"
import { GetContractObservableParams, GetNftsParams } from "../types.nft"
import { _getNfts } from "./get-nfts.nft"
import { WebSocketProvider, Contract } from "ethers"
import { evmWs } from "../../nodes"
import { erc721Abi } from "../../abi"

@Injectable()
export class BlockchainNftBaseService {
    private readonly logger = new Logger(BlockchainNftBaseService.name)

    constructor() {}

    public getNfts(params: GetNftsParams) {
        console.log("called")
        return _getNfts(params)
    }
}

