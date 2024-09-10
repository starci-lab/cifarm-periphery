import { Injectable, Logger } from "@nestjs/common"
import { GetContractObservableParams } from "../common"
import { WebSocketProvider, Contract } from "ethers"
import { evmWsRpcUrl } from "../../rpcs"
import { erc721Abi } from "../../abis"
import * as WebSocket from "ws"

@Injectable()
export class BlockchainNftObserverService {
    private readonly logger = new Logger(BlockchainNftObserverService.name)

    constructor() {}

    public observeEvm({ chainKey, network, nftAddress, eventName, callbackFn }: GetContractObservableParams) {
        const ws = evmWsRpcUrl(chainKey, network)
        const websocket = new WebSocket(ws)
        websocket.on("close", () => {
            this.logger.error(`WebSocket disconnected. Attempting to reconnect... : ${chainKey} ${network} ${eventName} `)
            start()
        })
        let contract: Contract | undefined
        const start = () => {
            const provider = new WebSocketProvider(websocket)
            if (contract) {
                contract.removeAllListeners(eventName)
            }
            contract = new Contract(nftAddress, erc721Abi, provider) 
          
            contract
                .on(eventName, callbackFn)
        }
        start()
    }
}

