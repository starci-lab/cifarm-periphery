import { packageConfig } from "@/config"
import { HttpStatus, Injectable, Logger, StreamableFile } from "@nestjs/common"
import { createReadStream, statSync } from "fs"
import { StreamContext } from "./dtos"

export interface StreamParams {
  fileUrl: string;
  filename: string;
}

@Injectable()
export class PackagesControllerService {
    private readonly logger = new Logger(PackagesControllerService.name)

    constructor() {}

    private stream(
        { fileUrl, filename }: StreamParams,
        { range, response }: StreamContext,
    ): StreamableFile {
        const totalBytes = statSync(fileUrl).size

        //xu ly khi ma co range
        if (!range) {
            const file = createReadStream(fileUrl)
            return new StreamableFile(file, {
                disposition: `inline; filename=${filename}`,
                length: totalBytes,
            })
        }

        const parts = range.replace(/bytes=/, "").split("-")
        const start = Number.parseInt(parts.at(0), 10)
        const partAtOne = parts.at(1)
        const end = partAtOne ? Number.parseInt(partAtOne, 10) : totalBytes - 1
        const chunksize = end - start + 1

        response.setHeader("Content-Range", `bytes ${start}-${end}/${totalBytes}`)
        response.setHeader("Accept-Ranges", "bytes")

        response.statusCode = HttpStatus.PARTIAL_CONTENT

        const file = createReadStream(fileUrl, {
            start,
            end,
        })
        return new StreamableFile(file, {
            disposition: `inline; filename=${filename}`,
            length: chunksize,
        })
    }

    public streamLoader(context: StreamContext): StreamableFile {
        return this.stream(
            {
                fileUrl: packageConfig().loader.url,
                filename: packageConfig().loader.filename,
            },
            context,
        )
    }

    public streamFramework(context: StreamContext): StreamableFile {
        return this.stream(
            {
                fileUrl: packageConfig().framework.url,
                filename: packageConfig().framework.filename,
            },
            context,
        )
    }

    public streamData(context: StreamContext): StreamableFile {
        return this.stream(
            {
                fileUrl: packageConfig().data.url,
                filename: packageConfig().data.filename,
            },
            context,
        )
    }

    public streamWasm(context: StreamContext): StreamableFile {
        return this.stream(
            {
                fileUrl: packageConfig().wasm.url,
                filename: packageConfig().wasm.filename,
            },
            context,
        )
    }
}
