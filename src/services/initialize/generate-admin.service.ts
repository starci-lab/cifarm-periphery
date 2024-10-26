import { envConfig } from "@/config"
import { AccountEntity, Role } from "@/database"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeepPartial, Repository } from "typeorm"
import { Sha256Service } from "../base"

@Injectable()
export class GenerateAdminService implements OnModuleInit {
    private readonly logger = new Logger(GenerateAdminService.name)

    constructor(
    @InjectRepository(AccountEntity)
    private readonly accountsRepository: Repository<AccountEntity>,
    private readonly sha256Service: Sha256Service,
    ) {}

    async onModuleInit() {
        const found = await this.accountsRepository.findOne({
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
            await this.accountsRepository.save(account)
            this.logger.debug(`Admin account created: ${account.id}`)
        } else {
            //update
            await this.accountsRepository.update(found.id, account)
            this.logger.debug(`Admin account updated: ${account.id}`)
        }
    }
}
