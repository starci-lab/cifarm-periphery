import { Network } from "@/config"
import { ManyResult, Metadata } from "@/services/types.service"
import { InputType, Field, ID, ObjectType, Int } from "@nestjs/graphql"

@InputType()
export class GetNftsInput {
  @Field(() => ID, {
      name: "accountAddress",
  })
      accountAddress: string

  @Field(() => String, {
      name: "network",
      nullable: true,
  })
      network?: Network

  @Field(() => String, {
      name: "nftKey",
      nullable: true,
  })
      nftKey: string

  @Field(() => String, {
      name: "chainKey",
      nullable: true,
  })
      chainKey: string
}

@ObjectType()
export class Nft {
  @Field(() => Int, {
      name: "tokenId",
  })
      tokenId: number

  @Field(() => String, {
      name: "tokenURI",
      nullable: true,
  })
      tokenURI: string
}

@ObjectType()
export class GetNftsResult implements ManyResult<Nft> {

  @Field(() => [Nft], {
      name: "records",
  })
      records: Array<Nft>
  @Field(() => Metadata, {
      name: "metadata",
  })
      metadata: Metadata
}
