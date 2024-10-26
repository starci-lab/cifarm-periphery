import { envConfig } from "@/config"
import { AccountEntity, Role } from "@/database"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { DataSource, DeepPartial } from "typeorm"
import { Sha256Service } from "../base"

@Injectable()
export class GenerateAdminService implements OnModuleInit {
    private readonly logger = new Logger(GenerateAdminService.name)

    constructor(
    private readonly dataSource: DataSource,
    private readonly sha256Service: Sha256Service,
    ) {}

    async onModuleInit() {
        const found = await this.dataSource.manager.findOne(AccountEntity, {
            where: {
                username: envConfig().secrets.admin.username,
            }
        })

        const account: DeepPartial<AccountEntity> = {
            username: envConfig().secrets.admin.username,
            hashedPassword: this.sha256Service.hash(
                envConfig().secrets.admin.password,
            ),
            roles: [
                {
                    role: Role.Admin,
                }
            ]
        }

        if (!found) {
            //create
            await this.dataSource.manager.save(AccountEntity, account)
            this.logger.debug(`Admin account created: ${account.id}`)
        } else {
            //update
            await this.dataSource.manager.save(AccountEntity, { ...account, id: found.id })
            this.logger.debug(`Admin account updated: ${found.id}`)
        }
    }
}
 