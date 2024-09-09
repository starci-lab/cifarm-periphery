import { ChainKeyNotFoundException } from "@/exceptions"

export enum Network {
  Testnet = "testnet",
  Mainnet = "mainnet",
}

export interface NftInfo {
    addresses: Record<Network, string>
}

export interface ChainIfo {
    nfts: Record<string, NftInfo>
}

export type BlockchainConfig = Record<string, ChainIfo>
export const blockchainConfig = (): BlockchainConfig => ({
    avalanche: {
        nfts: {
            premiumTile: {
                addresses: {
                    [Network.Mainnet]: "",
                    [Network.Testnet]: "0xA871f915Dc331797d12625277Cd7Ae1cbad9f05d",
                },
            },
        },
    },
})

export enum Platform {
  Evm = "evm",
}

export const chainKeyToPlatform = (chainKey: string): Platform => {
    switch (chainKey) {
    case "avalanche":
        return Platform.Evm
    default:
        throw new ChainKeyNotFoundException(chainKey)
    }
}
