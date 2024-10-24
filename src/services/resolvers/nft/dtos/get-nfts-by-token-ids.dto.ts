import { Network } from "@/config"
import { BaseArgs, ManyResult } from "@/services/common"
import { InputType, Field, ObjectType } from "@nestjs/graphql"
import { NftDataResponse } from "./common.dtos"

@InputType()
export class GetNftsByTokenIdsInput {
  @Field(() => [String], {
      name: "tokenIds",
  })
      tokenIds: Array<string>

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
export class GetNftsByTokenIdsArgs implements BaseArgs<GetNftsByTokenIdsInput> {
  @Field(() => GetNftsByTokenIdsInput, {
      name: "input",
      nullable: true,
  })
      input?: GetNftsByTokenIdsInput
}

@ObjectType()
export class GetNftsByTokenIdsResponse implements ManyResult<NftDataResponse> {
  @Field(() => [NftDataResponse], {
      name: "records",
  })
      records: Array<NftDataResponse>
}
