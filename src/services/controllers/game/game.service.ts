import { GameVersionEntity, PostgresErrorCode } from "@/database"
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common"
import { DataSource } from "typeorm"
import {
    CreateGameVersionRequestBody,
    CreateGameVersionResponse,
    CREATE_GAME_VERSION_SUCCESS_MESSAGE
} from "./dtos"
import { VersionAlreadyExistsException } from "@/exceptions"

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
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            await queryRunner.manager.update(GameVersionEntity, {}, {
                isActive: false,
            })
            const { id } = await queryRunner.manager.save(GameVersionEntity, {
                name,
                version,
                description,
            })
            await queryRunner.commitTransaction()
            return {
                message: CREATE_GAME_VERSION_SUCCESS_MESSAGE,
                data: {
                    id,
                },
            }
        } catch (ex) {
            await queryRunner.rollbackTransaction()
            const code = ex.code as string
            switch (code) {
            case PostgresErrorCode.Duplicated:
                throw new VersionAlreadyExistsException(version)
            default:
                throw new InternalServerErrorException(ex)
            }
        }
    }
}
