import { Global, Module } from "@nestjs/common"
import { BlockchainNftBaseService, BlockchainNftObserverService } from "./nft"
import { AlgorandAuthService, AptosAuthService, EvmAuthService, SolanaAuthService } from "./auth"
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
        SolanaAuthService,
        AlgorandAuthService
    ],
    exports: [
        BlockchainNftBaseService, 
        BlockchainNftObserverService,
        BlockchainTokenService,
        
        EvmAuthService,
        AptosAuthService,
        SolanaAuthService,
        AlgorandAuthService
    ]
}) 
export class BlockchainModule {}
