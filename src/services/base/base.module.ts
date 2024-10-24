import { Global, Module } from "@nestjs/common"
import { Sha256Service } from "./sha256.service"
import { RabbitMQService } from "./rabbitmq.service"
import { KafkaService } from "./kafka.service"

@Global()
@Module({
    imports: [],
    providers: [
        Sha256Service,
        RabbitMQService,
        KafkaService,
    ],
    exports: [
        Sha256Service,
        RabbitMQService,
        KafkaService,
    ]
})
export class BaseModule {}
