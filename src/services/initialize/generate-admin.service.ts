import { envConfig } from "@/config"
import { AccountEntity } from "@/database"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
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
        const account: Partial<AccountEntity> = {
            username: envConfig().secrets.admin.username,
            hashedPassword: this.sha256Service.hash(
                envConfig().secrets.admin.password,
            ),
        }
        await this.accountsRepository.upsert(account, ["username"])
        this.logger.debug(`Admin account: ${account.id}`)
    }
}
