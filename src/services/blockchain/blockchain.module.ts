import { Global, Module } from "@nestjs/common"
import { BlockchainNftBaseService, BlockchainNftObserverService } from "./nft"
import { AlgorandAuthService, AptosAuthService, EvmAuthService, SolanaAuthService } from "./auth"
import { BlockchainTokenService } from "./token"
import { IpfsService } from "./common"

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
        AlgorandAuthService,

        IpfsService
    ],
    exports: [
        BlockchainNftBaseService, 
        BlockchainNftObserverService,
        BlockchainTokenService,
        
        EvmAuthService,
        AptosAuthService,
        SolanaAuthService,
        AlgorandAuthService,

        IpfsService
    ]
}) 
export class BlockchainModule {}
