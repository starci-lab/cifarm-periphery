import { envConfig } from "@/config"
import { Injectable, Logger } from "@nestjs/common"
import { createHash } from "crypto"

@Injectable()
export class Sha256Service {
    private readonly logger = new Logger(Sha256Service.name)
    constructor () {}

    public hash(...values: string[]) : string {
        return createHash("sha256").update([...values, envConfig().secrets.salt].join()).digest("hex") 
    }
}