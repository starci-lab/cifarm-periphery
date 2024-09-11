import { PackagesControllerService } from "@/services"
import { Controller, Get, Logger, StreamableFile } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Packages")
@Controller("api/v1/packages")
export class PackagesController {
    private readonly logger = new Logger(PackagesController.name)
    constructor(private readonly packagesService: PackagesControllerService) {}

  @Get("loader")
    public streamLoader(): StreamableFile {
        return this.packagesService.streamLoader()
    }

  @Get("data")
  public streamData(): StreamableFile {
      return this.packagesService.streamData()
  }

  @Get("framework")
  public streamFramework(): StreamableFile {
      return this.packagesService.streamFramework()
  }

  @Get("wasm")
  public streamWasm(): StreamableFile {
      return this.packagesService.streamWasm()
  }
}
