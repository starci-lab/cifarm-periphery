import { envConfig } from "@/config"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"

@Injectable()
export class EnvDebugService implements OnModuleInit {
    private readonly logger = new Logger(EnvDebugService.name)
    onModuleInit() {
        // sercrets
        this.logger.debug(`TELEGRAM_CIFARM_BOT_TOKEN: ${envConfig().secrets.telegram.botTokens.cifarm}`)
        this.logger.debug(`TELEGRAM_CIWALLET_BOT_TOKEN: ${envConfig().secrets.telegram.botTokens.ciwallet}`)
        this.logger.debug(`TELEGRAM_MOCK_AUTHORIZATION: ${envConfig().secrets.telegram.mockAuthorization}`)
        this.logger.debug(`SALT: ${envConfig().secrets.salt}`)
        this.logger.debug(`JWT_SECRET: ${envConfig().secrets.jwt.secret}`)
        this.logger.debug(`JWT_EXPIRES_IN: ${envConfig().secrets.jwt.expiresIn}`)
        this.logger.debug(`ADMIN_USERNAME: ${envConfig().secrets.admin.username}`)
        this.logger.debug(`ADMIN_PASSWORD: ${envConfig().secrets.admin.password}`)
        // database
    }
}