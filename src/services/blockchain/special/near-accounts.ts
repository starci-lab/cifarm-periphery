import {
    blockchainConfig,
    envConfig,
    Network,
    SupportedChainKey,
} from "@/config"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { Account } from "near-api-js"
import { nearClient, nearKeyPair, nearKeyStore } from "../rpcs"
import { computeRaw } from "@/utils"
import { NearUsernameExistsException } from "@/exceptions"

export type NearAccounts = Record<Network, Account>;
//special service for near deposit, to create a new account
@Injectable()
export class NearAccountsService implements OnModuleInit {
    private readonly logger = new Logger(NearAccountsService.name)
    private accounts: NearAccounts
    //we'll take the deposit account
    constructor() {}

    private async createClient(network: Network): Promise<Account> {
        const { accountIds, privateKey } =
      envConfig().secrets.chainCredentials.near.deposit
        const accountId = accountIds[network]

        const keyPair = nearKeyPair(privateKey)
        const keyStore = nearKeyStore({
            network,
            keyPair,
            accountId,
        })

        const client = await nearClient(network, keyStore)
        this.logger.debug(`Connected to ${network} near deposit account: ${accountId}`)
        return await client.account(accountId)
    }
    async onModuleInit() {
        const [testnetAccount, mainnetAccount] = await Promise.all([
            this.createClient(Network.Testnet),
            this.createClient(Network.Mainnet),
        ])
        this.accounts = {
            [Network.Testnet]: testnetAccount,
            [Network.Mainnet]: mainnetAccount,
        }
    }

    public async createAccount({
        network,
        publicKey,
        username,
    }: NearDepositCreateAccountParams): Promise<NearDepositCreateAccountResult> {
        try {
            const account = this.accounts[network]
            const decimals = blockchainConfig()[SupportedChainKey.Near].decimals
            const {
                transaction_outcome: { id },
            } = await account.createAccount(
                `${username}.${account.accountId}`,
                publicKey,
                computeRaw(0.1, decimals),
            )
            return {
                transactionHash: id,
            }
        } catch (ex) {
            this.logger.error(ex)
            //maybe error from username exists
            console.log(ex)
            //test for username exists
            throw new NearUsernameExistsException(username)
        }
        
    }
}

export interface NearDepositCreateAccountParams {
  network: Network;
  //account id
  publicKey: string;
  //username
  username: string;
}

export interface NearDepositCreateAccountResult {
  //transaction hash
  transactionHash: string;
}
