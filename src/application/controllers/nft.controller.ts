import { Role } from "@/database"
import { Roles } from "@/decorators"
import { RestJwtAuthGuard, RolesGuard } from "@/guards"
import {
    NftControllerService,
    MintNftRequestBody,
    MintNftResponse,
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
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("NFT")
@Controller("api/v1/nft")
export class NftController {
    private readonly logger = new Logger(NftController.name)
    constructor(
    private readonly nftService: NftControllerService,
    ) {}

  @Roles([Role.NftMinter])
  @ApiBearerAuth()
  @UseGuards(RestJwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: MintNftResponse })
  @Post("mint")
    public async mintNft(@Body() body: MintNftRequestBody) {
        return await this.nftService.mintNft(body)
    }
}
