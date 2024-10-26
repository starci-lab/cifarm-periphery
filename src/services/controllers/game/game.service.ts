import { GameVersion } from "@/database"
import { Injectable, Logger } from "@nestjs/common"
import { DataSource } from "typeorm"
import {
    CreateGameVersionRequestBody,
    CreateGameVersionResponse,
} from "./dtos/create-game-version.dto"
import { CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE } from "../authenticator"

@Injectable()
export class GameControllerService {
    private readonly logger = new Logger(GameControllerService.name)

    constructor(private readonly dataSource: DataSource) {}

    public async getActiveGameVersion(): Promise<GameVersion> {
        return await this.dataSource.manager.findOne(GameVersion, {
            where: {
                isActive: true,
            },
        })
    }

    public async createGameVersion({
        description,
        name,
        version,
    }: CreateGameVersionRequestBody): Promise<CreateGameVersionResponse> {
        const { id } = await this.dataSource.manager.save(GameVersion, {
            name,
            version,
            description,
        })
        return {
            message: CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE,
            data: {
                id,
            },
        }
    }
}
