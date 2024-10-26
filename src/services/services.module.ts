import { Module } from "@nestjs/common"
import { BlockchainModule } from "./blockchain"
import { ResolversModule } from "./resolvers"
import { ControllersModule } from "./controllers"
import { BaseModule } from "./base"
import { InitializeModule } from "./initialize"

@Module({
    imports: [
        BaseModule,
        BlockchainModule,
        ResolversModule,
        ControllersModule,
        InitializeModule,
    ],
})
export class ServicesModule {}
 