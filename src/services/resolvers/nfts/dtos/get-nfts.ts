import { Network } from "@/config"
import { BaseArgs, ManyResult } from "../../../common"
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

@InputType()
export class GetNftsFilter {
  @Field(() => Int, {
      name: "skip",
      nullable: true,
  })
      skip?: number

  @Field(() => Int, {
      name: "take",
      nullable: true,
  })
      take?: number
}

@InputType()
export class GetNftsArgs implements BaseArgs<GetNftsInput, GetNftsFilter> {
  @Field(() => GetNftsInput, {
      name: "input",
      nullable: true,
  })
      input?: GetNftsInput
  @Field(() => GetNftsFilter, {
      name: "filter",
      nullable: true,
  })
      filter?: GetNftsFilter
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
