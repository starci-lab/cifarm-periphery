import {
    GetNftsByOwnerAddressArgs,
    GetNftsByOwnerAddressResponse,
    GetNftsByTokenIdsArgs,
    GetNftsByTokenIdsResponse,
    NftsResolverService,
} from "@/services"
import { Logger } from "@nestjs/common"

import { Args, Query, Resolver } from "@nestjs/graphql"

@Resolver("Nfts")
export class NftsResolver {
    private readonly logger = new Logger(NftsResolver.name)

    constructor(private readonly nftsService: NftsResolverService) {}

  @Query(() => GetNftsByOwnerAddressResponse, {
      name: "nftsByOwnerAddress",
  })
    public async getNftsByOwnerAddress(
    @Args("args") args: GetNftsByOwnerAddressArgs,
    ): Promise<GetNftsByOwnerAddressResponse> {
        return await this.nftsService.getNftsByOwnerAddress(args)
    }

  @Query(() => GetNftsByTokenIdsResponse, {
      name: "nftsByTokenIds",
  })
  public async getOwners(
    @Args("args") input: GetNftsByTokenIdsArgs,
  ): Promise<GetNftsByTokenIdsResponse> {
      return await this.nftsService.getNftsByTokenIds(input)
  }
}
