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

export class InvalidSignatureException extends HttpException {
    constructor(signature: string) {
        super(`Invalid signature: ${signature}`, HttpStatus.BAD_REQUEST)
    }
}

export class AccountAddressNotFoundException extends HttpException {
    constructor(accountAddress: string) {
        super(`Account address not found: ${accountAddress}`, HttpStatus.BAD_REQUEST)
    }
}