import { Global, Module } from "@nestjs/common"
import { EnvDebugService } from "./env-debug.service"
import { GenerateAdminService } from "./generate-admin.service"

@Global()
@Module({
    imports: [],
    providers: [
        EnvDebugService,
        GenerateAdminService
    ],
})
export class InitializeModule {}
