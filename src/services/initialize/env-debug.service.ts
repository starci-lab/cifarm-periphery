import { envConfig, Network } from "@/config"
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

        // near private keys
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
        this.logger.debug(
            `NEAR_DEPOSIT_PRIVATE_KEY: ${envConfig().secrets.chainCredentials.near.deposit.privateKey}`,
        )

        // near account id map - testnet
        this.logger.debug(
            `NEAR_TESNET_TOKEN_MINTER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.tokenMinter.accountIds[Network.Testnet]}`,
        )
        this.logger.debug(
            `NEAR_TESNET_TOKEN_BURNER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.tokenBurner.accountIds[Network.Testnet]}`,
        )
        this.logger.debug(
            `NEAR_TESNET_NFT_MINTER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftMinter.accountIds[Network.Testnet]}`,
        )
        this.logger.debug(
            `NEAR_TESNET_NFT_BURNER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftBurner.accountIds[Network.Testnet]}`,
        )
        this.logger.debug(
            `NEAR_TESNET_NFT_UPDATER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftUpdater.accountIds[Network.Testnet]}`,
        )
        this.logger.debug(
            `NEAR_TESNET_ADMIN_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.admin.accountIds[Network.Testnet]}`,
        )
        this.logger.debug(
            `NEAR_TESTNET_DEPOSIT_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.deposit.accountIds[Network.Testnet]}`,
        )

        // near account id map - mainnet
        this.logger.debug(
            `NEAR_MAINNET_TOKEN_MINTER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.tokenMinter.accountIds[Network.Mainnet]}`,
        )
        this.logger.debug(
            `NEAR_MAINNET_TOKEN_BURNER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.tokenBurner.accountIds[Network.Mainnet]}`,
        )
        this.logger.debug(
            `NEAR_MAINNET_NFT_MINTER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftMinter.accountIds[Network.Mainnet]}`,
        )
        this.logger.debug(
            `NEAR_MAINNET_NFT_BURNER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftBurner.accountIds[Network.Mainnet]}`,
        )
        this.logger.debug(
            `NEAR_MAINNET_NFT_UPDATER_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.nftUpdater.accountIds[Network.Mainnet]}`,
        )
        this.logger.debug(
            `NEAR_MAINNET_ADMIN_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.admin.accountIds[Network.Mainnet]}`,
        )
        this.logger.debug(
            `NEAR_MAINNET_DEPOSIT_ACCOUNT_ID: ${envConfig().secrets.chainCredentials.near.deposit.accountIds[Network.Mainnet]}`,
        )
    // database
    }
}
