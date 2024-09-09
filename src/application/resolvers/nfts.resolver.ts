import {
    GetNftsInput,
    GetNftsResult,
    Nft,
    NftsResolverService,
} from "@/services"
import { Logger } from "@nestjs/common"

import { Args, Query, Resolver } from "@nestjs/graphql"

@Resolver()
export class NftsResolver {
    private readonly logger = new Logger(NftsResolver.name)

    constructor(private readonly nftsService: NftsResolverService) {}

  @Query(() => GetNftsResult, {
      name: "nfts"
  })
    public async getNfts(@Args("input") input: GetNftsInput): Promise<GetNftsResult> {
        return await this.nftsService.getNfts(input)
    }
}
