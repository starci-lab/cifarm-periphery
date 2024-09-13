import { ObjectType, Field, Int } from "@nestjs/graphql"

@ObjectType()
export class NftDataResponse {
  @Field(() => Int, {
      name: "tokenId",
  })
      tokenId: number

  @Field(() => String, {
      name: "tokenURI",
      nullable: true,
  })
      tokenURI: string
  @Field(() => String, {
      name: "ownerAddress",
      nullable: true,
  })
      ownerAddress: string
}
