import { Global, Module } from "@nestjs/common"
import { AuthenticatorControllerService } from "./authenticator"
import { PackagesControllerService } from "./packages"
import { TokenControllerService } from "./token"

@Global()
@Module({
    imports: [],
    providers: [
        AuthenticatorControllerService,
        PackagesControllerService,
        TokenControllerService
    ],
    exports: [
        AuthenticatorControllerService,
        PackagesControllerService,
        TokenControllerService
    ],
})
export class ControllersModule {}
