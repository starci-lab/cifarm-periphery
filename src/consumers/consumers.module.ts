import {  Module } from "@nestjs/common"
import { InviteModule } from "./invite"

@Module({
    imports: [InviteModule],
})
export class ConsumersModule {}
