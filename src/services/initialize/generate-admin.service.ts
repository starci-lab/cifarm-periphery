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
        //try remove admin account if exists
        await this.dataSource.manager.delete(AccountEntity, {
            username: envConfig().secrets.admin.username,
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
        await this.dataSource.manager.save(AccountEntity, account)
        this.logger.debug(`Admin account created: ${account.id}`)
    }
}
 