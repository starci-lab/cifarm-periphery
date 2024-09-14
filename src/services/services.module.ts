import { Module } from "@nestjs/common"
import { BlockchainModule } from "./blockchain"
import { ResolversModule } from "./resolvers"
import { ControllersModule } from "./controllers"
import { BaseModule } from "./base"

@Module({
    imports: [
        BaseModule,
        BlockchainModule,
        ResolversModule,
        ControllersModule
    ],
})
export class ServicesModule {}
 