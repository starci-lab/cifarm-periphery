import { Global, Module } from "@nestjs/common"
import { AuthenticatorControllerService } from "./authenticator"
import { PackagesControllerService } from "./packages"
import { TokenControllerService } from "./token"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity, RoleEntity, UserEntity } from "@/database"
import { JwtStrategy } from "@/strategies"

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            AccountEntity,
            RoleEntity
        ])
    ],
    providers: [
        AuthenticatorControllerService,
        PackagesControllerService,
        TokenControllerService,
        JwtStrategy
    ],
    exports: [
        AuthenticatorControllerService,
        PackagesControllerService,
        TokenControllerService
    ],
})
export class ControllersModule {}
