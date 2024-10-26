import { Global, Module } from "@nestjs/common"
import { EnvDebugService } from "./env-debug.service"
import { GenerateAdminService } from "./generate-admin.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity } from "@/database"

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity
        ]),
    ],
    providers: [
        EnvDebugService,
        GenerateAdminService
    ],
})
export class InitializeModule {}
