import { Global, Module } from "@nestjs/common"
import { AuthenticatorControllerService } from "./authenticator"
import { PackagesControllerService } from "./packages"

@Global()
@Module({
    imports: [],
    providers: [
        AuthenticatorControllerService,
        PackagesControllerService
    ],
    exports: [
        AuthenticatorControllerService,
        PackagesControllerService
    ],
})
export class ControllersModule {}
