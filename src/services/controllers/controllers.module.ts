import { Global, Module } from "@nestjs/common"
import { AuthenticatorControllerService } from "./authenticator"
import { PackagesControllerService } from "./packages"
import { TokenControllerService } from "./token"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity, GameVersionEntity, RoleEntity, UserEntity } from "@/database"
import { GameControllerService } from "./game"
import { NftControllerService } from "./nft"
import { SpecialControllerService } from "./special"

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
        SpecialControllerService,
    ],
    exports: [
        AuthenticatorControllerService,
        PackagesControllerService,
        TokenControllerService,
        GameControllerService,
        NftControllerService,
        SpecialControllerService,
    ],
})
export class ControllersModule {}
