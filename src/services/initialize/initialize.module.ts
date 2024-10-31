import { Global, Module } from "@nestjs/common"
import { EnvDebugService } from "./env-debug.service"
import { GenerateAdminService } from "./generate-admin.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity, RoleEntity } from "@/database"

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
    ],
    exports: [
        EnvDebugService,
        GenerateAdminService,
    ]
})
export class InitializeModule {}
