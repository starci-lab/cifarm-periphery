import { Module } from "@nestjs/common"
import { ResolversModule } from "./resolvers"
import { ControllersModule } from "./controllers"

@Module({
    imports: [
        ResolversModule,
        ControllersModule
    ],
})
export class ApplicationModule {}
