import { envConfig } from "@/config"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { Network } from "@/config"

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

        //near
        this.logger.debug(
            `NEAR_TOKEN_MINTER_PRIVATE_KEY_TESTNET: ${envConfig().chainCredentials.near.tokenMinter[Network.Testnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_TOKEN_MINTER_ACCOUNT_ID_TESTNET: ${envConfig().chainCredentials.near.tokenMinter[Network.Testnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_TOKEN_MINTER_PRIVATE_KEY_MAINNET: ${envConfig().chainCredentials.near.tokenMinter[Network.Mainnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_TOKEN_MINTER_ACCOUNT_ID_MAINNET: ${envConfig().chainCredentials.near.tokenMinter[Network.Mainnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_TOKEN_BURNER_PRIVATE_KEY_TESTNET: ${envConfig().chainCredentials.near.tokenBurner[Network.Testnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_TOKEN_BURNER_ACCOUNT_ID_TESTNET: ${envConfig().chainCredentials.near.tokenBurner[Network.Testnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_TOKEN_BURNER_PRIVATE_KEY_MAINNET: ${envConfig().chainCredentials.near.tokenBurner[Network.Mainnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_TOKEN_BURNER_ACCOUNT_ID_MAINNET: ${envConfig().chainCredentials.near.tokenBurner[Network.Mainnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_NFT_MINTER_PRIVATE_KEY_TESTNET: ${envConfig().chainCredentials.near.nftMinter[Network.Testnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_NFT_MINTER_ACCOUNT_ID_TESTNET: ${envConfig().chainCredentials.near.nftMinter[Network.Testnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_NFT_MINTER_PRIVATE_KEY_MAINNET: ${envConfig().chainCredentials.near.nftMinter[Network.Mainnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_NFT_MINTER_ACCOUNT_ID_MAINNET: ${envConfig().chainCredentials.near.nftMinter[Network.Mainnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_NFT_BURNER_PRIVATE_KEY_TESTNET: ${envConfig().chainCredentials.near.nftBurner[Network.Testnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_NFT_BURNER_ACCOUNT_ID_TESTNET: ${envConfig().chainCredentials.near.nftBurner[Network.Testnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_NFT_BURNER_PRIVATE_KEY_MAINNET: ${envConfig().chainCredentials.near.nftBurner[Network.Mainnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_NFT_BURNER_ACCOUNT_ID_MAINNET: ${envConfig().chainCredentials.near.nftBurner[Network.Mainnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_NFT_UPDATER_PRIVATE_KEY_TESTNET: ${envConfig().chainCredentials.near.nftUpdater[Network.Testnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_NFT_UPDATER_ACCOUNT_ID_TESTNET: ${envConfig().chainCredentials.near.nftUpdater[Network.Testnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_NFT_UPDATER_PRIVATE_KEY_MAINNET: ${envConfig().chainCredentials.near.nftUpdater[Network.Mainnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_NFT_UPDATER_ACCOUNT_ID_MAINNET: ${envConfig().chainCredentials.near.nftUpdater[Network.Mainnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_ADMIN_PRIVATE_KEY_TESTNET: ${envConfig().chainCredentials.near.admin[Network.Testnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_ADMIN_ACCOUNT_ID_TESTNET: ${envConfig().chainCredentials.near.admin[Network.Testnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_ADMIN_PRIVATE_KEY_MAINNET: ${envConfig().chainCredentials.near.admin[Network.Mainnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_ADMIN_ACCOUNT_ID_MAINNET: ${envConfig().chainCredentials.near.admin[Network.Mainnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_CREATOR_PRIVATE_KEY_TESTNET: ${envConfig().chainCredentials.near.creator[Network.Testnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_CREATOR_ACCOUNT_ID_TESTNET: ${envConfig().chainCredentials.near.creator[Network.Testnet].accountId}`,
        )
        this.logger.debug(
            `NEAR_CREATOR_PRIVATE_KEY_MAINNET: ${envConfig().chainCredentials.near.creator[Network.Mainnet].privateKey}`,
        )
        this.logger.debug(
            `NEAR_CREATOR_ACCOUNT_ID_MAINNET: ${envConfig().chainCredentials.near.creator[Network.Mainnet].accountId}`,
        )

    // database
    }
}
