import { Module } from "@nestjs/common"
import { ResolversModule } from "./resolvers"
import { ControllersModule } from "./controllers"
import { WebsocketModule } from "./websocket"

@Module({
    imports: [
        ResolversModule,
        ControllersModule,
        WebsocketModule
    ],
})
export class ApplicationModule {}
