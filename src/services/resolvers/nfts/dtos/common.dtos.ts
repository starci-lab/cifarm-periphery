import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class NftDataResponse {
  @Field(() => String, {
      name: "tokenId",
  })
      tokenId: string

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
