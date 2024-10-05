import { envConfig } from "@/config"
import { Injectable, Logger } from "@nestjs/common"
import {
    ClientProxyFactory,
    ClientRMQ,
    Transport,
} from "@nestjs/microservices"
import { ChannelWrapper, connect } from "amqp-connection-manager"
import { ConfirmChannel, ConsumeMessage, credentials } from "amqplib"

@Injectable()
export class RabbitMQService {
    private readonly channelWrappers: Record<string, ChannelWrapper> = {}
    private readonly clients: Record<string, ClientRMQ> = {}
    private readonly logger = new Logger(RabbitMQService.name)
    constructor() {}

    async createPublisher(queue: string): Promise<ClientRMQ> {
        const client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [
                    `amqp://${envConfig().messageBrokers.rabbitMq.rabbitMq1.user}:${envConfig().messageBrokers.rabbitMq.rabbitMq1.password}@${envConfig().messageBrokers.rabbitMq.rabbitMq1.host}:${envConfig().messageBrokers.rabbitMq.rabbitMq1.port}`,
                ],
                queue,
                queueOptions: {
                    durable: false,
                },
            },
        }) as ClientRMQ
        await client.connect()
        this.clients[queue] = client
        return client
    }

    getPublisher(queue: string) {
        return this.clients[queue]
    }

    async registerConsumer<TContent>(
        queue: string,
        callback: (content: TContent) => void,
    ): Promise<void> {
        try {
            const connection = connect([
                `amqp://${envConfig().messageBrokers.rabbitMq.rabbitMq1.host}:${envConfig().messageBrokers.rabbitMq.rabbitMq1.port}`,
            ], {
                connectionOptions: {
                    credentials: credentials.plain(envConfig().messageBrokers.rabbitMq.rabbitMq1.user, envConfig().messageBrokers.rabbitMq.rabbitMq1.password),
                }
            })
            this.channelWrappers[queue] = connection.createChannel()
            await this.channelWrappers[queue].addSetup(
                async (channel: ConfirmChannel) => {
                    await channel.assertQueue(queue, { durable: false })
                    await channel.consume(queue, async (message: ConsumeMessage) => {
                        this.logger.log(message)
                        if (message) {
                            const content = JSON.parse(message.content.toString())
                                .data as TContent
                            callback(content)
                            channel.ack(message)
                        }
                    })
                }, 
            )
            this.logger.debug(`Consumer registered for queue: ${queue}`)
        } catch (ex) {
            this.logger.error(ex)
        }
    }

    async removeConsumer(queue: string): Promise<void> {
        try {
            await this.channelWrappers[queue].close()
            delete this.channelWrappers[queue]
        } catch (ex) {
            this.logger.error(ex)
        }
    }
}
