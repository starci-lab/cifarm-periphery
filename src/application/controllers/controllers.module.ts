import { Module } from "@nestjs/common"
import { AuthenticatorController } from "./authenticator.controller"

@Module({
    imports: [
    ],
    controllers: [
        AuthenticatorController,
    ],
})
export class ControllersModule {}
