import { Global, Module } from "@nestjs/common"
import { EnvDebugService } from "./env-debug.service"
import { GenerateAdminService } from "./generate-admin.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity, RoleEntity } from "@/database"
import { ChainCredentialsService } from "./chain-credentials.service"

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity,
            RoleEntity
        ]),
    ],
    providers: [
        EnvDebugService,
        GenerateAdminService,
        ChainCredentialsService
    ],
    exports: [
        EnvDebugService,
        GenerateAdminService,
        ChainCredentialsService
    ]
})
export class InitializeModule {}
