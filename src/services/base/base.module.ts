import { Global, Module } from "@nestjs/common"
import { Sha256Service } from "./sha256.service"
import { RabbitMQService } from "./rabbitmq.service"
import { KafkaService } from "./kafka.service"
import { JwtService } from "@nestjs/jwt"

@Global()
@Module({
    imports: [],
    providers: [
        Sha256Service,
        RabbitMQService,
        KafkaService,
        JwtService
    ],
    exports: [
        Sha256Service,
        RabbitMQService,
        KafkaService,
        JwtService
    ]
})
export class BaseModule {}
