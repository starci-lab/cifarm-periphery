import { NftsResolverService } from "./nfts/nfts.service"
import { Global, Module } from "@nestjs/common"

@Global()
@Module({
    imports: [
    ],
    providers: [
        NftsResolverService
    ],
    exports: [
        NftsResolverService
    ]
})
export class ResolversModule {}
