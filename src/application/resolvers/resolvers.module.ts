
import { Module } from "@nestjs/common"
import { NftResolver } from "./nfts.resolver"

@Module({
    imports: [],
    providers: [ NftResolver ],
})
export class ResolversModule {}
