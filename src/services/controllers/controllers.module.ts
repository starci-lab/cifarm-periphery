import { Global, Module } from "@nestjs/common"
import { AuthenticatorControllerService } from "./authenticator"

@Global()
@Module({
    imports: [],
    providers: [
        AuthenticatorControllerService,
    ],
    exports: [
        AuthenticatorControllerService,
    ],
})
export class ControllersModule {}
