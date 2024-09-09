import { Module } from "@nestjs/common"
import { BlockchainObserver } from "./blockchain"

@Module({
    imports: [
    ],
    providers: [
        BlockchainObserver
    ]
})
export class ObserversModule {}
