import { Global, Module } from "@nestjs/common"
import { BlockchainNftBaseService, BlockchainNftObserverService } from "./nft"
import { AptosAuthService, EvmAuthService } from "./auth"

@Global()
@Module({
    imports: [],
    providers: [
        BlockchainNftBaseService, 
        BlockchainNftObserverService,

        EvmAuthService,
        AptosAuthService
    ],
    exports: [
        BlockchainNftBaseService, 
        BlockchainNftObserverService,

        EvmAuthService,
        AptosAuthService
    ]
})
export class BlockchainModule {}
