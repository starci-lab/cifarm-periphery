import { Module } from "@nestjs/common"
import { AuthenticatorController } from "./authenticator.controller"
import { PackagesController } from "./packages.controller"
import { TokenController } from "./token.controller"
import { GameController } from "./game.controller"
import { NftController } from "./nft.controller"

@Module({
    imports: [
    ],
    controllers: [
        AuthenticatorController,
        PackagesController,
        TokenController,
        GameController,
        NftController
    ],
})
export class ControllersModule {}
