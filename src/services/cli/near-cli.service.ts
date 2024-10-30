import { Injectable, Logger } from "@nestjs/common"

@Injectable()
export class NearCliService {
    private readonly logger = new Logger(NearCliService.name)
    constructor() {}

    public async createAccount() {
        this.logger.log("Creating account")
    }
}