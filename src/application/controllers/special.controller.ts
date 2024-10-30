import {
    CreateNearAccountRequestBody,
    CreateNearAccountResponse,
    SpecialControllerService,
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

@ApiTags("Special")
@Controller("api/v1/special")
export class SpecialController {
    private readonly logger = new Logger(SpecialController.name)
    constructor(
    private readonly specialService: SpecialControllerService,
    ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: CreateNearAccountResponse })
  @Post("create-near-account")
    public async createNearAccount(@Body() body: CreateNearAccountRequestBody) {
        return await this.specialService.createNearAcount(body)
    }
}
