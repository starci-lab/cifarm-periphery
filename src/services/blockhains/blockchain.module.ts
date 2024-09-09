import { Global, Module } from "@nestjs/common"
import { BlockchainNftBaseService, BlockchainNftObserverService } from "./nft"

@Global()
@Module({
    imports: [],
    providers: [
        BlockchainNftBaseService, 
        BlockchainNftObserverService
    ],
    exports: [
        BlockchainNftBaseService, 
        BlockchainNftObserverService
    ]
})
export class BlockchainModule {}
