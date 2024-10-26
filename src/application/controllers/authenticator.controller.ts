import { Role } from "@/database"
import { TelegramData } from "@/decorators"
import { Roles } from "@/decorators"
import {
    RestJwtAuthGuard,
    TelegramAuthorizationGuard,
    TelegramData as TelegramDataType,
} from "@/guards"
import { RolesGuard } from "@/guards/roles.guard"
import {
    AuthenticatorControllerService,
    AuthorizeTelegramResponse,
    CreateAccountRequestBody,
    CreateAccountResponse,
    GetFakeSignatureRequestBody,
    GetFakeSignatureResponse,
    SignInRequestBody,
    SignInResponse,
    RequestMessageResponse,
    VerifyMessageRequestBody,
    VerifyMessageResponse,
    UpdateAccountRequestBody,
    UpdateAccountResponse,
    DeleteAccountRequestBody,
} from "@/services"
import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Authenticator")
@Controller("api/v1/authenticator")
export class AuthenticatorController {
    private readonly logger = new Logger(AuthenticatorController.name)
    constructor(
    private readonly authenticatorService: AuthenticatorControllerService,
    ) {}

  //@UseGuards(DebugGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: VerifyMessageResponse })
  @Post("verify-message")
    public async verifyMessage(@Body() body: VerifyMessageRequestBody) {
        return await this.authenticatorService.verifyMessage(body)
    }

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: RequestMessageResponse })
  @Post("request-message")
  public async requestMessage() {
      return await this.authenticatorService.requestMessage()
  }

  //temp keep for development
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: GetFakeSignatureResponse })
  @Post("fake-signature")
  public async getFakeSignature(@Body() body: GetFakeSignatureRequestBody) {
      return await this.authenticatorService.getFakeSignature(body)
  }

  @UseGuards(TelegramAuthorizationGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: AuthorizeTelegramResponse })
  @Post("authorize-telegram")
  public async authorizeTelegram(
    @TelegramData() telegramData: TelegramDataType,
  ) {
      return await this.authenticatorService.authorizeTelegram({
          telegramData,
      })
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: SignInResponse })
  @Post("sign-in")
  public async signIn(@Body() body: SignInRequestBody) {
      return await this.authenticatorService.signIn(body)
  }

  @Roles([Role.Admin])
  @ApiBearerAuth()
  @UseGuards(RestJwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: CreateAccountResponse })
  @Post("account")
  public async createAccount(@Body() body: CreateAccountRequestBody) {
      return await this.authenticatorService.createAccount(body)
  }

  @Roles([Role.Admin])
  @ApiBearerAuth()
  @UseGuards(RestJwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: UpdateAccountResponse })
  @Put("account")
  public async updateAccount(@Body() body: UpdateAccountRequestBody) {
      return await this.authenticatorService.updateAccount(body)
  }

  @Roles([Role.Admin])
  @ApiBearerAuth()
  @UseGuards(RestJwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: DeleteAccountRequestBody })
  @Delete("account")
  public async deleteAccount(@Body() body: DeleteAccountRequestBody) {
      return await this.authenticatorService.deleteAccount(body)
  }
}
