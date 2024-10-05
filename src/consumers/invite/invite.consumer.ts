import { RabbitMQService } from "@/services"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"

export const INVITE_QUEUE = "invite-queue"

@Injectable()
export class InviteConsumer implements OnModuleInit {
    private readonly logger = new Logger(InviteConsumer.name)
    constructor(
        private readonly rabbitMQService: RabbitMQService
    ) {}

    async onModuleInit() {
        try {
            await this.rabbitMQService.registerConsumer<string>(INVITE_QUEUE, (content) => {
                this.logger.log(content)
            })
        } catch (ex) {
            this.logger.error(ex)
        }
    }
}

export interface InviteData {
    userId: string
}