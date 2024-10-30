import { Module } from "@nestjs/common"
import { AuthenticatorController } from "./authenticator.controller"
import { PackagesController } from "./packages.controller"
import { TokenController } from "./token.controller"
import { GameController } from "./game.controller"
import { NftController } from "./nft.controller"
import { SpecialController } from "./special.controller"

@Module({
    imports: [
    ],
    controllers: [
        AuthenticatorController,
        PackagesController,
        TokenController,
        GameController,
        NftController,
        SpecialController
    ],
})
export class ControllersModule {}
