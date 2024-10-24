import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class NftMetadataResponse {
  @Field(() => String, { name: "image" })
      image: string
  //string only for graphql queries
  @Field(() => String, { name: "properties" })
      properties: string
}

@ObjectType()
export class NftDataResponse {
  @Field(() => String, {
      name: "tokenId",
  })
      tokenId: string

  @Field(() => NftMetadataResponse, {
      name: "metadata",
      nullable: true,
  })
      metadata: NftMetadataResponse
  @Field(() => String, {
      name: "ownerAddress",
      nullable: true,
  })
      ownerAddress: string
}
