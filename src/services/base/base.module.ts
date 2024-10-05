import { Global, Module } from "@nestjs/common"
import { Sha256Service } from "./sha256.service"
import { RabbitMQService } from "./rabbitmq.service"

@Global()
@Module({
    imports: [],
    providers: [
        Sha256Service,
        RabbitMQService,
    ],
    exports: [
        Sha256Service,
        RabbitMQService
    ]
})
export class BaseModule {}
