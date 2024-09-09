import { HttpException, HttpStatus } from "@nestjs/common"

export class ChainKeyNotFoundException extends HttpException {
    constructor(chainKey: string) {
        super(`Chain key not found: ${chainKey}`, HttpStatus.NOT_FOUND)
    }
}

export class PlatformNotFoundException extends HttpException {
    constructor(platform: string) {
        super(`Platform not found: ${platform}`, HttpStatus.NOT_FOUND)
    }
}