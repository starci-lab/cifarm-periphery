import { Global, Module } from "@nestjs/common"
import { AuthenticatorControllerService } from "./authenticator"
import { PackagesControllerService } from "./packages"
import { TokenControllerService } from "./token"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity, GameVersionEntity, RoleEntity, UserEntity } from "@/database"
import { JwtStrategy } from "@/strategies"
import { GameControllerService } from "./game"
import { NftControllerService } from "./nft"

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            AccountEntity,
            RoleEntity,
            GameVersionEntity
        ])
    ],
    providers: [
        AuthenticatorControllerService,
        PackagesControllerService,
        TokenControllerService,
        GameControllerService,
        NftControllerService,
        JwtStrategy
    ],
    exports: [
        AuthenticatorControllerService,
        PackagesControllerService,
        TokenControllerService,
        GameControllerService,
        NftControllerService,
    ],
})
export class ControllersModule {}
