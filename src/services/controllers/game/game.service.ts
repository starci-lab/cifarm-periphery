import { GameVersionEntity } from "@/database"
import { Injectable, Logger } from "@nestjs/common"
import { DataSource } from "typeorm"
import {
    CreateGameVersionRequestBody,
    CreateGameVersionResponse,
    CREATE_GAME_VERSION_SUCCESS_MESSAGE
} from "./dtos"

@Injectable()
export class GameControllerService {
    private readonly logger = new Logger(GameControllerService.name)

    constructor(private readonly dataSource: DataSource) {}

    public async getActiveGameVersion(): Promise<GameVersionEntity> {
        return await this.dataSource.manager.findOne(GameVersionEntity, {
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
        //update all game version to inactive
        await this.dataSource.manager.update(GameVersionEntity, {}, {
            isActive: false,
        })
        const { id } = await this.dataSource.manager.save(GameVersionEntity, {
            name,
            version,
            description,
        })
        return {
            message: CREATE_GAME_VERSION_SUCCESS_MESSAGE,
            data: {
                id,
            },
        }
    }
}
