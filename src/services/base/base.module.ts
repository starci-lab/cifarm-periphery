import { Global, Module } from "@nestjs/common"
import { Sha256Service } from "./sha256.service"

@Global()
@Module({
    imports: [],
    providers: [
        Sha256Service
    ],
    exports: [
        Sha256Service
    ]
})
export class BaseModule {}
