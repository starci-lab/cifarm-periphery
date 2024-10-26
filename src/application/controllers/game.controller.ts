import { GameVersionEntity, Role } from "@/database"
import { Roles } from "@/decorators"
import {
    RestJwtAuthGuard,
} from "@/guards"
import { RolesGuard } from "@/guards"
import {
    GameControllerService,
    CreateGameVersionResponse,
    CreateGameVersionRequestBody,
} from "@/services"
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    UseGuards,
} from "@nestjs/common"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Game")
@Controller("api/v1/game")
export class GameController {
    private readonly logger = new Logger(GameController.name)
    constructor(private readonly gameService: GameControllerService) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: GameVersionEntity })
  @Get("version")
    public async delete() {
        return await this.gameService.getActiveGameVersion()
    }

  @Roles([Role.GameManager])
  @ApiBearerAuth()
  @UseGuards(RestJwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: CreateGameVersionResponse })
  @Post("version")
  public async createGameVersion(@Body() body: CreateGameVersionRequestBody) {
      return await this.gameService.createGameVersion(body)
  }
}
