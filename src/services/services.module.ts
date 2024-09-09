import { Module } from "@nestjs/common"
import { BlockchainModule } from "./blockhains"
import { ResolversModule } from "./resolvers"

@Module({
    imports: [
        BlockchainModule,
        ResolversModule
    ],
})
export class ServicesModule {}
