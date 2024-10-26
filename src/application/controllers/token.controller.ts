import {
    TokenControllerService,
    MintRequestBody,
    MintResponse,
} from "@/services"
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
} from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Token")
@Controller("api/v1/token")
export class TokenController {
    private readonly logger = new Logger(TokenController.name)
    constructor(
    private readonly tokenService: TokenControllerService,
    ) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: MintResponse })
  @Post("mint")
    public async verifyMessage(@Body() body: MintRequestBody) {
        return await this.tokenService.mint(body)
    }
}
