import { Module } from "@nestjs/common"
import { ResolversModule } from "./resolvers"

@Module({
    imports: [
        ResolversModule
    ],
})
export class ApplicationModule {}
