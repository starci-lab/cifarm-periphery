import { KafkaService } from "@/services"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"

export const INVITE_GROUP_TOPIC = "invite"

@Injectable()
export class InviteConsumer implements OnModuleInit {
    private readonly logger = new Logger(InviteConsumer.name)
    constructor(private readonly kafkaService: KafkaService) {}

    async onModuleInit() {
        try {
            const consumer = await this.kafkaService.createConsumer({
                groupId: INVITE_GROUP_TOPIC,
            })
            await consumer.subscribe({
                topic: INVITE_GROUP_TOPIC,
                fromBeginning: true,
            })
            consumer.run({
                eachMessage: async ({ message }) => {
                    console.log({
                        value: message.value.toString(),
                    })
                }
            }
            )
        } catch (ex) {
            this.logger.error(ex) 
        }
    }
}

export interface InviteData {
  userId: string;
}
