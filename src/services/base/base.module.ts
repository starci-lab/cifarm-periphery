import { Global, Module } from "@nestjs/common"
import { Sha256Service } from "./sha256.service"
import { RabbitMQService } from "./rabbitmq.service"
import { KafkaService } from "./kafka.service"
import { IpfsService } from "./ipfs.service"

@Global()
@Module({
    imports: [],
    providers: [
        Sha256Service,
        RabbitMQService,
        KafkaService,
        IpfsService,

    ],
    exports: [
        Sha256Service,
        RabbitMQService,
        KafkaService,
        IpfsService,
    ]
})
export class BaseModule {}
