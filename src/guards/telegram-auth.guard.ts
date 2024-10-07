import { envConfig } from "@/config"
import { TelegramAuthorizationFailedException } from "@/exceptions"
import { CanActivate, ExecutionContext, Logger } from "@nestjs/common"
import { validate, parse } from "@telegram-apps/init-data-node"
import { Observable } from "rxjs"

export interface TelegramData {
    userId: number
}

export class TelegramAuthorizationGuard implements CanActivate {
    private readonly logger = new Logger(TelegramAuthorizationGuard.name)
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const [authType, authData = ""] =
      (request.headers["authorization"]  || "").split(" ")

        switch (authType) {
        case "tma": {
            try {
                if (authData === envConfig().secrets.telegram.mockAuthorization) {
                    const telegramData: TelegramData = {
                        userId: 123456789
                    }
                    request.telegramData = telegramData
                    return true
                }
                validate(authData, envConfig().secrets.telegram.botToken, {
                    // We consider init data sign valid for 1 hour from their creation moment.
                    expiresIn: 3600,
                })
                // Parse init data. We will surely need it in the future.
                const parsed = parse(authData)
                const telegramData: TelegramData = {
                    userId: parsed.user.id
                }
                request.telegramData = telegramData
                return true
            } catch (ex) {

                this.logger.error(ex.message)
                throw new TelegramAuthorizationFailedException(ex.message)
            }
        }
        default: {
            throw new TelegramAuthorizationFailedException("Authorization data not found")
        }
        }
    }
}
