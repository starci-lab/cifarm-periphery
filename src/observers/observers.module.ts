import { Module } from "@nestjs/common"
import { BlockchainObserver } from "./blockchain"
import { MongooseModule } from "@nestjs/mongoose"
import { NftTransferSchema, NftTransferSchemaClass } from "@/database"

@Module({
    imports: [
        MongooseModule.forFeature([{name: NftTransferSchema.name, schema: NftTransferSchemaClass }])
    ],
    providers: [
        BlockchainObserver
    ]
})
export class ObserversModule {}
