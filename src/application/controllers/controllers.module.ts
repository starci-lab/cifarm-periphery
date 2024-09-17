import { Module } from "@nestjs/common"
import { AuthenticatorController } from "./authenticator.controller"
import { PackagesController } from "./packages.controller"
import { TokenController } from "./token.controller"

@Module({
    imports: [
    ],
    controllers: [
        AuthenticatorController,
        PackagesController,
        TokenController
    ],
})
export class ControllersModule {}
