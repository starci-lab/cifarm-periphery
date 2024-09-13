import { Network } from "@/config"
import { BaseArgs } from "@/services/common"
import { InputType, Field, Int } from "@nestjs/graphql"

@InputType()
export class GetNftByTokenIdInput {
  @Field(() => Int, {
      name: "tokenId",
  })
      tokenId: number

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
export class GetNftByTokenIdArgs implements BaseArgs<GetNftByTokenIdInput> {
  @Field(() => GetNftByTokenIdInput, {
      name: "input",
      nullable: true,
  })
      input?: GetNftByTokenIdInput
}