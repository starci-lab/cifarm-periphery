import { Global, Module } from "@nestjs/common"
import { EnvDebugService } from "./env-debug.service"

@Global()
@Module({
    imports: [],
    providers: [
        EnvDebugService
    ],
})
export class InitModule {}
