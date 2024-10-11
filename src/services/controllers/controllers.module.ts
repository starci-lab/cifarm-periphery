import { Global, Module } from "@nestjs/common"
import { AuthenticatorControllerService } from "./authenticator"
import { PackagesControllerService } from "./packages"
import { TokenControllerService } from "./token"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersEntity } from "@/database"

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsersEntity
        ])
    ],
    providers: [
        AuthenticatorControllerService,
        PackagesControllerService,
        TokenControllerService
    ],
    exports: [
        AuthenticatorControllerService,
        PackagesControllerService,
        TokenControllerService
    ],
})
export class ControllersModule {}
