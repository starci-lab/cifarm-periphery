import { TelegramData } from "@/guards"
import { HttpResponse } from "@/utils"
import { ApiProperty } from "@nestjs/swagger"


export class AuthorizeTelegramContext {
    telegramData: TelegramData
}

export class AuthorizeTelegramResponseData {
  @ApiProperty()
      telegramData: TelegramData
}

export const AUTHORIZE_TELEGRAM_RESPONSE_SUCCESS_MESSAGE =
  "Telegram authorize successfully"
export class AuthorizeTelegramResponse
implements HttpResponse<AuthorizeTelegramResponseData>
{
  @ApiProperty({ example: AUTHORIZE_TELEGRAM_RESPONSE_SUCCESS_MESSAGE })
      message: string
  @ApiProperty()
      data: AuthorizeTelegramResponseData
}
