import { Network, blockchainConfig } from "@/config"
import { Injectable, Logger } from "@nestjs/common"
import { Timeout } from "@nestjs/schedule"
import { BlockchainNftObserverService } from "@/services"

@Injectable()
export class BlockchainObserver {
    private readonly logger = new Logger(BlockchainObserver.name)

    constructor(private readonly nftObserverService : BlockchainNftObserverService) {}

    @Timeout(0)
    async observeEvmNftTransfers() {
        const chainKeys = Object.keys(blockchainConfig()) 
        const networks = Object.values(Network) 
        for (const chainKey of chainKeys) {
            for (const network of networks) {
                const nftAddresses = Object.values(blockchainConfig()[chainKey].nfts).map(({ addresses }) => addresses[network])
                for (const nftAddress of nftAddresses) {
                    if (!nftAddress) continue
                    this.nftObserverService.observeEvm({
                        chainKey,
                        network,
                        nftAddress,
                        eventName: "Transfer",
                    })
                }   
            }
        }
    }
}