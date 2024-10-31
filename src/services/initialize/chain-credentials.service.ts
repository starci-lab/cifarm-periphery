import { Network, SupportedChainKey } from "@/config"
import { getEnvValue } from "@/utils"
import { Injectable, Logger } from "@nestjs/common"
import { readFileSync } from "fs"
import { join } from "path"

export interface NearPair {
  privateKey: string;
  accountId: string;
}

export interface ChainCredentialsConfig {
  [SupportedChainKey.Near]: {
    tokenMinter: Record<Network, NearPair>;
    tokenBurner: Record<Network, NearPair>;
    nftMinter: Record<Network, NearPair>;
    nftBurner: Record<Network, NearPair>;
    nftUpdater: Record<Network, NearPair>;
    admin: Record<Network, NearPair>;
    // creator is account used for create near account
    creator: Record<Network, NearPair>;
  };
}

@Injectable()
export class ChainCredentialsService {
    private readonly logger = new Logger(ChainCredentialsService.name)
    public config: ChainCredentialsConfig

    constructor() { 
        const url = join(
            process.cwd(),
            getEnvValue({
                development: "chain-credentials.local.json",
                production: "chain-credentials.json",
            }),
        )
        const fileContent = readFileSync(url, "utf-8")
        // Parse and return the JSON content
        this.config = JSON.parse(fileContent)
        this.logger.debug(
            "Chain credentials loaded",
        )
    }
}