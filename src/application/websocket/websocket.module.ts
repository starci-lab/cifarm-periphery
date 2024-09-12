import { Module } from "@nestjs/common"
import { NftTranferGateway } from "./nft-transfer.gateway"
import { MongooseModule } from "@nestjs/mongoose"
import { NftTransferSchema, NftTransferSchemaClass } from "@/database"

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: NftTransferSchema.name, schema: NftTransferSchemaClass },
        ]),
    ],
    providers: [NftTranferGateway],
})
export class WebsocketModule {}
