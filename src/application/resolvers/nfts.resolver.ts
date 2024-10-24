import {
    GetNftByTokenIdArgs,
    GetNftsByOwnerAddressArgs,
    GetNftsByOwnerAddressResponse,
    GetNftsByTokenIdsArgs,
    GetNftsByTokenIdsResponse,
    NftDataResponse,
    NftResolverService,
} from "@/services"
import { Logger } from "@nestjs/common"

import { Args, Query, Resolver } from "@nestjs/graphql"

@Resolver("Nft")
export class NftResolver {
    private readonly logger = new Logger(NftResolver.name)

    constructor(private readonly nftService: NftResolverService) {}

  @Query(() => GetNftsByOwnerAddressResponse, {
      name: "nftsByOwnerAddress",
  })
    public async getNftsByOwnerAddress(
    @Args("args") args: GetNftsByOwnerAddressArgs,
    ): Promise<GetNftsByOwnerAddressResponse> {
        return await this.nftService.getNftsByOwnerAddress(args)
    }

  @Query(() => GetNftsByTokenIdsResponse, {
      name: "nftsByTokenIds",
  })
  public async getNftsByTokenIds(
    @Args("args") input: GetNftsByTokenIdsArgs,
  ): Promise<GetNftsByTokenIdsResponse> {
      return await this.nftService.getNftsByTokenIds(input)
  }

  @Query(() => NftDataResponse, {
      name: "nftByTokenId",
      nullable: true
  })
  public async getNftByTokenId(
  @Args("args") input: GetNftByTokenIdArgs,
  ): Promise<NftDataResponse> {
      return await this.nftService.getNftByTokenId(input)
  }
}
  