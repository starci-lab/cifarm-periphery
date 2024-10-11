import { TelegramData } from "@/guards"
import { HttpResponse } from "@/utils"
import { ApiProperty } from "@nestjs/swagger"


export class RegisterTelegramContext {
    telegramData: TelegramData
}

export class RegisterTelegramResponseData {
  @ApiProperty()
      telegramData: TelegramData
}

export const REGISTER_TELEGRAM_RESPONSE_SUCCESS_MESSAGE =
  "Telegram register successfully"
export class RegisterTelegramResponse
implements HttpResponse<RegisterTelegramResponseData>
{
  @ApiProperty({ example: REGISTER_TELEGRAM_RESPONSE_SUCCESS_MESSAGE })
      message: string
  @ApiProperty()
      data: RegisterTelegramResponseData
}
