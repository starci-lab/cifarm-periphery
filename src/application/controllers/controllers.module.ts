import { Module } from "@nestjs/common"
import { AuthenticatorController } from "./authenticator.controller"
import { PackagesController } from "./packages.controller"

@Module({
    imports: [
    ],
    controllers: [
        AuthenticatorController,
        PackagesController
    ],
})
export class ControllersModule {}
