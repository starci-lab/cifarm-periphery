import { Module } from "@nestjs/common"
import { AuthenticatorController } from "./authenticator.controller"
import { PackagesController } from "./packages.controller"
import { TokenController } from "./token.controller"
import { GameController } from "./game.controller"

@Module({
    imports: [
    ],
    controllers: [
        AuthenticatorController,
        PackagesController,
        TokenController,
        GameController
    ],
})
export class ControllersModule {}
