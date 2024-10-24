import { NftResolverService } from "./nft"
import { Global, Module } from "@nestjs/common"

@Global()
@Module({
    imports: [
    ],
    providers: [
        NftResolverService
    ],
    exports: [
        NftResolverService
    ]
})
export class ResolversModule {}
