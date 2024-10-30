import { envConfig } from "@/config"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"

@Injectable()
export class EnvDebugService implements OnModuleInit {
    private readonly logger = new Logger(EnvDebugService.name)
    onModuleInit() {
    // sercrets
        this.logger.debug(
            `TELEGRAM_CIFARM_BOT_TOKEN: ${envConfig().secrets.telegram.botTokens.cifarm}`,
        )
        this.logger.debug(
            `TELEGRAM_CIWALLET_BOT_TOKEN: ${envConfig().secrets.telegram.botTokens.ciwallet}`,
        )
        this.logger.debug(
            `TELEGRAM_MOCK_AUTHORIZATION: ${envConfig().secrets.telegram.mockAuthorization}`,
        )
        this.logger.debug(`SALT: ${envConfig().secrets.salt}`)
        this.logger.debug(`JWT_SECRET: ${envConfig().secrets.jwt.secret}`)
        this.logger.debug(`JWT_EXPIRES_IN: ${envConfig().secrets.jwt.expiresIn}`)
        this.logger.debug(`ADMIN_USERNAME: ${envConfig().secrets.admin.username}`)
        this.logger.debug(`ADMIN_PASSWORD: ${envConfig().secrets.admin.password}`)

        // near
        this.logger.debug(
            `NEAR_TOKEN_MINTER_PRIVATE_KEY: ${envConfig().secrets.chainCredentials.near.tokenMinter.privateKey}`,
        )
        this.logger.debug(
            `NEAR_TOKEN_BURNER_PRIVATE_KEY: ${envConfig().secrets.chainCredentials.near.tokenBurner.privateKey}`,
        )
        this.logger.debug(
            `NEAR_NFT_MINTER_PRIVATE_KEY: ${envConfig().secrets.chainCredentials.near.nftMinter.privateKey}`,
        )
        this.logger.debug(
            `NEAR_NFT_BURNER_PRIVATE_KEY: ${envConfig().secrets.chainCredentials.near.nftBurner.privateKey}`,
        )
        this.logger.debug(
            `NEAR_NFT_UPDATER_PRIVATE_KEY: ${envConfig().secrets.chainCredentials.near.nftUpdater.privateKey}`,
        )
        this.logger.debug(
            `NEAR_ADMIN_PRIVATE_KEY: ${envConfig().secrets.chainCredentials.near.admin.privateKey}`,
        )

        // near account id map
        this.logger.debug(
            `NEAR_TOKEN_MINTER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftUpdater.accountId}`,
        )
        this.logger.debug(
            `NEAR_TOKEN_BURNER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftUpdater.accountId}`,
        )
        this.logger.debug(
            `NEAR_NFT_MINTER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftUpdater.accountId}`,
        )
        this.logger.debug(
            `NEAR_NFT_BURNER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftUpdater.accountId}`,
        )
        this.logger.debug(
            `NEAR_NFT_UPDATER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftUpdater.accountId}`,
        )
        this.logger.debug(
            `NEAR_ADMIN_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftUpdater.accountId}`,
        )
    // database
    }
}
