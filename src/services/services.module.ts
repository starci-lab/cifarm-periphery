import { Module } from "@nestjs/common"
import { BlockchainModule } from "./blockchain"
import { ResolversModule } from "./resolvers"
import { ControllersModule } from "./controllers"

@Module({
    imports: [
        BlockchainModule,
        ResolversModule,
        ControllersModule
    ],
})
export class ServicesModule {}
