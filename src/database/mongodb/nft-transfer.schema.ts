import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type NftTransferDocument = HydratedDocument<NftTransferSchema>;

@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    collection: "nft-transfers",
})
export class NftTransferSchema {
  @Prop({ type: String, required: true, unique: true })
      transactionHash: string
  @Prop({ type: String, required: true })
      from: string
  @Prop({ type: String, required: true })
      to: string
  @Prop({ type: String, required: true })
      chainKey: string
  @Prop({ type: String, required: true })
      network: string
  @Prop({ type: String, required: true })
      nftKey: string
  @Prop({ type: String, required: true })
      nftAddress: string
  @Prop({ type: Number, required: true })
      tokenId: number
}

export const NftTransferSchemaClass =
  SchemaFactory.createForClass(NftTransferSchema)
