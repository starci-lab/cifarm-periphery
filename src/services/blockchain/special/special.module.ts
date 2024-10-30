import { Global, Module } from "@nestjs/common"
import { NearDepositService } from "./near-deposit.service"

@Global()
@Module({
    imports: [],
    providers: [NearDepositService],
    exports: [NearDepositService],
})
export class SpecialModule {}
