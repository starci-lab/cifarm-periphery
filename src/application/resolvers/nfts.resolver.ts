import {
    GetNftsArgs,
    GetNftsResponse,
    NftsResolverService,
} from "@/services"
import { Logger } from "@nestjs/common"

import { Args, Query, Resolver } from "@nestjs/graphql"

@Resolver("Nfts")
export class NftsResolver {
    private readonly logger = new Logger(NftsResolver.name)

    constructor(private readonly nftsService: NftsResolverService) {}

  @Query(() => GetNftsResponse, {
      name: "nfts"
  })
    public async getNfts(@Args("args") input: GetNftsArgs): Promise<GetNftsResponse> {
        return await this.nftsService.getNfts(input)
    }
}
