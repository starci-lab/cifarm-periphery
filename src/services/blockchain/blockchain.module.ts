import { Global, Module } from "@nestjs/common"
import { BlockchainNftBaseService, BlockchainNftObserverService } from "./nft"
import { AptosAuthService, EvmAuthService, SolanaAuthService } from "./auth"
import { BlockchainTokenService } from "./token"

@Global()
@Module({
    imports: [],
    providers: [
        BlockchainNftBaseService, 
        BlockchainNftObserverService,
        BlockchainTokenService,

        EvmAuthService,
        AptosAuthService,
        SolanaAuthService
    ],
    exports: [
        BlockchainNftBaseService, 
        BlockchainNftObserverService,
        BlockchainTokenService,
        
        EvmAuthService,
        AptosAuthService,
        SolanaAuthService
    ]
})
export class BlockchainModule {}
