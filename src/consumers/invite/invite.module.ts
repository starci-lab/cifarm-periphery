import { Module } from "@nestjs/common"
import { InviteConsumer } from "./invite.consumer"

@Module({
    imports: [],
    providers: [
        InviteConsumer,
    ],
})
export class InviteModule {}
