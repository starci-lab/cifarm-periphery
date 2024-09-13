import {
    GetNftByTokenIdArgs,
    GetNftsByOwnerAddressArgs,
    GetNftsByOwnerAddressResponse,
    GetNftsByTokenIdsArgs,
    GetNftsByTokenIdsResponse,
    NftDataResponse,
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
  public async getNftsByTokenIds(
    @Args("args") input: GetNftsByTokenIdsArgs,
  ): Promise<GetNftsByTokenIdsResponse> {
      return await this.nftsService.getNftsByTokenIds(input)
  }

  @Query(() => NftDataResponse, {
      name: "nftByTokenId",
      nullable: true
  })
  public async getNftByTokenId(
  @Args("args") input: GetNftByTokenIdArgs,
  ): Promise<NftDataResponse> {
      return await this.nftsService.getNftByTokenId(input)
  }
}
