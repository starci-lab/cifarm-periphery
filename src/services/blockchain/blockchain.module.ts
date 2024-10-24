import { Global, Module } from "@nestjs/common"
import { IpfsService, BlockchainNftBaseService, BlockchainNftObserverService } from "./nft"
import { AlgorandAuthService, AptosAuthService, EvmAuthService, PolkadotAuthService, SolanaAuthService } from "./auth"
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
        AlgorandAuthService,
        PolkadotAuthService,

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
        PolkadotAuthService,

        IpfsService
    ]
}) 
export class BlockchainModule {}
