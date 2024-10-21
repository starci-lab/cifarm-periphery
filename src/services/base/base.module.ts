import { Global, Module } from "@nestjs/common"
import { Sha256Service } from "./sha256.service"
import { RabbitMQService } from "./rabbitmq.service"
import { KafkaService } from "./kafka.service"
import { CIDService } from "./cid.service"

@Global()
@Module({
    imports: [],
    providers: [
        Sha256Service,
        RabbitMQService,
        KafkaService,
        CIDService
    ],
    exports: [
        Sha256Service,
        RabbitMQService,
        KafkaService,
        CIDService
    ]
})
export class BaseModule {}
