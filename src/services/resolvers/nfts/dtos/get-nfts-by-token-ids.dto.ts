import { Network } from "@/config"
import { BaseArgs, ManyResult } from "@/services/common"
import { InputType, Field, ObjectType, Int } from "@nestjs/graphql"
import { NftData } from "./common.dtos"

@InputType()
export class GetNftByTokenIdsInput {
  @Field(() => [Int], {
      name: "tokenIds",
  })
      tokenIds: Array<number>

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
export class GetNftsByTokenIdsArgs implements BaseArgs<GetNftByTokenIdsInput> {
  @Field(() => GetNftByTokenIdsInput, {
      name: "input",
      nullable: true,
  })
      input?: GetNftByTokenIdsInput
}

@ObjectType()
export class GetNftsByTokenIdsResponse implements ManyResult<NftData> {
  @Field(() => [NftData], {
      name: "records",
  })
      records: Array<NftData>
}
