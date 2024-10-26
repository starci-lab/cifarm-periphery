import { Module } from "@nestjs/common"
import { AuthenticatorController } from "./authenticator.controller"
import { PackagesController } from "./packages.controller"
import { TokenController } from "./token.controller"
import { GameControllerService } from "@/services"

@Module({
    imports: [
    ],
    controllers: [
        AuthenticatorController,
        PackagesController,
        TokenController,
        GameControllerService
    ],
})
export class ControllersModule {}
