import { Network } from "@/config"
import { BaseArgs } from "@/services/common"
import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class GetNftByTokenIdInput {
  @Field(() => String, {
      name: "tokenId",
  })
      tokenId: string

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
export class GetNftByTokenIdArgs implements BaseArgs<GetNftByTokenIdInput> {
  @Field(() => GetNftByTokenIdInput, {
      name: "input",
      nullable: true,
  })
      input?: GetNftByTokenIdInput
}