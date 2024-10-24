import { Network } from "@/config"
import { BaseArgs, ManyResult } from "../../../common"
import { InputType, Field, ID, ObjectType, Int } from "@nestjs/graphql"
import { NftDataResponse } from "./common.dtos"

@InputType()
export class GetNftsByOwnerAddressInput {
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
      name: "nftCollectionKey",
      nullable: true,
  })
      nftCollectionKey: string

  @Field(() => String, {
      name: "chainKey",
      nullable: true,
  })
      chainKey: string
}

@InputType()
export class GetNftsByOwnerAddressFilter {
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
export class GetNftsByOwnerAddressArgs implements BaseArgs<GetNftsByOwnerAddressInput, GetNftsByOwnerAddressFilter> {
  @Field(() => GetNftsByOwnerAddressInput, {
      name: "input",
      nullable: true,
  })
      input?: GetNftsByOwnerAddressInput
  @Field(() => GetNftsByOwnerAddressFilter, {
      name: "filter",
      nullable: true,
  })
      filter?: GetNftsByOwnerAddressFilter
}

@ObjectType()
export class GetNftsByOwnerAddressResponse implements ManyResult<NftDataResponse> {
  @Field(() => [NftDataResponse], {
      name: "records",
  })
      records: Array<NftDataResponse>
  @Field(() => Int, {
      name: "count",
  })
      count: number
}
