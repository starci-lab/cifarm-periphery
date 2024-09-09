import { Injectable, Logger } from "@nestjs/common"
import { GetContractObservableParams } from "../types.nft"
import { WebSocketProvider, Contract } from "ethers"
import { evmWsRpcUrl } from "../../rpcs"
import { erc721Abi } from "../../abi"

@Injectable()
export class BlockchainNftObserverService {
    private readonly logger = new Logger(BlockchainNftObserverService.name)

    constructor() {}

    public observeEvm({ chainKey, network, nftAddress, eventName, callbackFn }: GetContractObservableParams) {
        const ws = evmWsRpcUrl(chainKey, network)
        const websocket = new WebSocket(ws)
        let provider = new WebSocketProvider(websocket)

        websocket.onclose = () => {
            this.logger.verbose(`Disconnected. Reconnecting...: ${chainKey} ${network}`)
            provider = new WebSocketProvider(websocket  )
            startObserve()
        }
 
        let contract: Contract
        const startObserve =() => {
            contract = new Contract(nftAddress, erc721Abi, provider) 
            contract.removeAllListeners(eventName)
          
            contract
                .on(eventName, callbackFn)
        }
        startObserve()
    }
}

