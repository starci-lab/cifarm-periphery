import { envConfig } from "@/config"
import { Injectable, Logger } from "@nestjs/common"
import { Producer, Consumer, Kafka } from "kafkajs"

const CLIENT_ID = "cifarm-periphery"

export interface CreateProducerParams {
  key?: string;
}

export interface CreateConsumerParams {
  key?: string;
  groupId?: string;
}

export const DEFAULT_KEY = "defaultKey"
export const DEFAULT_GROUP_ID = "defaultGroupId"

@Injectable()
export class KafkaService {
    private readonly logger = new Logger(KafkaService.name)

    public readonly producers: Record<string, Producer> = {}
    public readonly consumers: Record<string, Consumer> = {}

    constructor() {}

    public async createProducer({
        key,
    }: CreateProducerParams): Promise<Producer> {
        key = key || "defaultKey"
        if (this.producers[key]) return this.producers[key]

        try {
            const kafka = new Kafka({
                clientId: CLIENT_ID,
                brokers: [
                    `${envConfig().messageBrokers.kafka.kafka1.host}:${envConfig().messageBrokers.kafka.kafka1.port}`,
                ],
            })

            const producer = kafka.producer()
            await producer.connect()

            this.producers[key] = producer
            this.logger.debug(`Kafka - producer created with key: ${key}`)
            return producer
        } catch (ex) {
            this.logger.error(ex)
        }
    }

    public async createConsumer(params?: CreateConsumerParams): Promise<Consumer> {
        const key = params.key ?? DEFAULT_KEY
        const groupId = params.groupId ?? DEFAULT_GROUP_ID
        if (this.consumers[key]) return this.consumers[groupId]
        this.logger.debug(`${envConfig().messageBrokers.kafka.kafka1.host}:${envConfig().messageBrokers.kafka.kafka1.port}`)
        try {
            const kafka = new Kafka({
                clientId: CLIENT_ID,
                brokers: [
                    `${envConfig().messageBrokers.kafka.kafka1.host}:${envConfig().messageBrokers.kafka.kafka1.port}`,
                ],

            })

            const consumer = kafka.consumer({ groupId, heartbeatInterval: 30 })
            this.consumers[key] = consumer
            await consumer.connect()

            this.logger.debug(`Kafka - consumer created with group id: ${groupId}`)
            return consumer
        } catch (ex) {
            this.logger.error(ex)
        }
    } 
}
