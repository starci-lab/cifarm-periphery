import { Network } from "@/config"
import { ManyResult } from "../../../common"
import { InputType, Field, ID, ObjectType, Int } from "@nestjs/graphql"

@InputType()
export class GetNftsArgs {
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
  @Field(() => Int, {
      name: "skip",
      nullable: true
  })
      skip?: number

  @Field(() => String, {
      name: "take",
      nullable: true,
  })
      take?: number
}

@ObjectType()
export class NftResponse {
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
export class GetNftsResponse implements ManyResult<NftResponse> {
  @Field(() => [NftResponse], {
      name: "records",
  })
      records: Array<NftResponse>
      @Field(() => Int, {
          name: "count",
      })
          count: number
      
}
