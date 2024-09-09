import { Global, Module } from "@nestjs/common"
import { BlockchainNftService } from "./nft"

@Global()
@Module({
    imports: [],
    providers: [
        BlockchainNftService
    ],
    exports: [
        BlockchainNftService
    ]
})
export class BlockchainModule {}
