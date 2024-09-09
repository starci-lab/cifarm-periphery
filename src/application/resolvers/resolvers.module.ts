
import { Module } from "@nestjs/common"
import { NftsResolver } from "./nfts.resolver"

@Module({
    imports: [],
    providers: [ NftsResolver ],
})
export class ResolversModule {}
