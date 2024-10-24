import { Injectable, Logger } from "@nestjs/common"
import axios from "axios"

@Injectable()
export class FetchService {
    private readonly logger = new Logger(FetchService.name)
    
    constructor() {}

    async fetch(uri: string) {
        try {
            const { data } = await axios.get(uri)
            return data
        } catch (ex) {
            this.logger.error(ex)
            return null
        }
    }
}