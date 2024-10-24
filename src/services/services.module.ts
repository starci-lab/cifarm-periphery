import { Module } from "@nestjs/common"
import { BlockchainModule } from "./blockchain"
import { ResolversModule } from "./resolvers"
import { ControllersModule } from "./controllers"
import { BaseModule } from "./base"
import { InitModule } from "./init"

@Module({
    imports: [
        BaseModule,
        BlockchainModule,
        ResolversModule,
        ControllersModule,
        InitModule,
    ],
})
export class ServicesModule {}
 