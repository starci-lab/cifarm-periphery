import { TelegramData } from "@/decorators"
import { RestJwtAuthGuard, TelegramAuthorizationGuard, TelegramData as TelegramDataType } from "@/guards"
import {
    AuthenticatorControllerService,
    AuthorizeTelegramResponse,
    CreateAccountRequestBody,
    CreateAccountResponse,
    GetFakeSignatureRequestBody,
    GetFakeSignatureResponse,
    SignInRequestBody,
    SignInResponse,
} from "@/services"
import {
    RequestMessageResponse,
    VerifyMessageRequestBody,
    VerifyMessageResponse,
} from "@/services"
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    UseGuards,
} from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Authenticator")
@Controller("api/v1/authenticator")
export class AuthenticatorController {
    private readonly logger = new Logger(AuthenticatorController.name)
    constructor(
    private readonly authenticatorService: AuthenticatorControllerService,
    ) {}
  
  //@UseGuards(DebugGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: VerifyMessageResponse, status: 200 })
  @Post("verify-message")
    public async verifyMessage(@Body() body: VerifyMessageRequestBody) {
        return await this.authenticatorService.verifyMessage(body)
    }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: RequestMessageResponse, status: 201 })
  @Post("request-message")
  public async requestMessage() {
      return await this.authenticatorService.requestMessage()
  }

  //temp keep for development
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: GetFakeSignatureResponse, status: 200 })
  @Post("fake-signature")
  public async getFakeSignature(@Body() body: GetFakeSignatureRequestBody) {
      return await this.authenticatorService.getFakeSignature(body)
  }

  @UseGuards(TelegramAuthorizationGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: AuthorizeTelegramResponse, status: 200 })
  @Post("authorize-telegram")
  public async authorizeTelegram(@TelegramData() telegramData: TelegramDataType) {
      return await this.authenticatorService.authorizeTelegram({
          telegramData,
      })
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: SignInResponse, status: 200 })
  @Post("sign-in")
  public async signIn(@Body() body: SignInRequestBody) {
      return await this.authenticatorService.signIn(body)
  }

  @UseGuards(RestJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: CreateAccountResponse, status: 200 })
  @Post("account")
  public async create(@Body() body: CreateAccountRequestBody) {
      return await this.authenticatorService.createAccount(body)
  }
}
