import { envConfig } from "@/config"
import { TelegramAuthorizationFailedException } from "@/exceptions"
import { CanActivate, ExecutionContext, Logger } from "@nestjs/common"
import { validate, parse } from "@telegram-apps/init-data-node"
import { Observable } from "rxjs"

export interface TelegramData {
    userId: number
    username: string
}

export const validateSuccess = (authData: string, botToken: string) : [boolean, unknown | undefined] => {
    try {
        validate(authData, botToken, {
            expiresIn: 3600,
        })
        return [true, undefined]
    } catch (ex) {
        return [false, ex]
    }
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
            const [mockAuthorization, mockUserId = ""] = authData.split(",")
            if (mockAuthorization === envConfig().secrets.telegram.mockAuthorization) {
                const telegramData: TelegramData = {
                    userId: mockUserId ? Number(mockUserId) : 123456789,
                    username: "test"
                }
                request.telegramData = telegramData
                return true
            }
            const [ ciwalletResult, ciwalletEx ] = validateSuccess(authData, envConfig().secrets.telegram.botTokens.ciwallet)
            //if both fail we only log ciwallet
            const [ cifarmResult ] = validateSuccess(authData, envConfig().secrets.telegram.botTokens.cifarm)
            if (!ciwalletResult && !cifarmResult) {
                this.logger.error(`Telegram authorization failed: ${ciwalletEx.toString()}`)
                throw new TelegramAuthorizationFailedException(`${ciwalletEx.toString()}`)
            }

            // Parse init data. We will surely need it in the future.
            const parsed = parse(authData)
            const telegramData: TelegramData = {
                userId: parsed.user.id,
                username: parsed.user.username,
            }
            request.telegramData = telegramData
            return true
        }
        default: {
            throw new TelegramAuthorizationFailedException("Authorization data not found")
        }
        }
    }
}
