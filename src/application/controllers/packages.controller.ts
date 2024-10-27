import { PackagesControllerService } from "@/services"
import { Response } from "express"
import { Controller, Get, Logger, Res, StreamableFile, Headers } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Packages")
@Controller("api/v1/packages")
export class PackagesController {
    private readonly logger = new Logger(PackagesController.name)
    constructor(private readonly packagesService: PackagesControllerService) {}
    
  @Get("loader")
    public streamLoader(
        @Res({ passthrough: true }) response: Response,
        @Headers("range") range: string,
    ): StreamableFile {
        return this.packagesService.streamLoader({ range, response })
    }

  @Get("data")
  public streamData(
    @Res({ passthrough: true }) response: Response,
    @Headers("range") range: string,
  ): StreamableFile {
      return this.packagesService.streamData({ range, response })
  }

  @Get("framework")
  public streamFramework(
    @Res({ passthrough: true }) response: Response,
    @Headers("range") range: string,
  ): StreamableFile {
      return this.packagesService.streamFramework({ range, response })
  }

  @Get("wasm")
  public streamWasm(
    @Res({ passthrough: true }) response: Response,
    @Headers("range") range: string,
  ): StreamableFile {
      return this.packagesService.streamWasm({ range, response })
  }
}
