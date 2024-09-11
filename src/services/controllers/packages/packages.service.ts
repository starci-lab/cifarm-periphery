import { packageConfig } from "@/config"
import { Injectable, Logger, StreamableFile } from "@nestjs/common"
import { createReadStream } from "fs"

@Injectable()
export class PackagesControllerService {
    private readonly logger = new Logger(PackagesControllerService.name)
    
    constructor() {}

    public streamLoader(): StreamableFile {
        const file = createReadStream(packageConfig().loader.url)
        return new StreamableFile(file, {
            disposition: `inline; filename=${packageConfig().loader.filename}`,
        })
    }

    public streamFramework(): StreamableFile {
        const file = createReadStream(packageConfig().framework.url)
        return new StreamableFile(file, {
            disposition: `inline; filename=${packageConfig().framework.filename}`,
        })
    }

    public streamData(): StreamableFile {
        const file = createReadStream(packageConfig().data.url)
        return new StreamableFile(file, {
            disposition: `inline; filename=${packageConfig().data.filename}`,
        })
    }

    public streamWasm(): StreamableFile {
        const file = createReadStream(packageConfig().wasm.url)
        return new StreamableFile(file, {
            disposition: `inline; filename=${packageConfig().wasm.filename}`,
        })
    }
}