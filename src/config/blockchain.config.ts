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
                    [Network.Testnet]: "0x410d3e15058e8544B14FD1a317E330f693444673",
                },
            },
        },
    },
})

export const defaultChainKey = Object.keys(blockchainConfig())[0]
export const defaultNftKey = Object.keys(blockchainConfig()[defaultChainKey].nfts)[0]


export enum Platform {
  Evm = "evm",
  Aptos = "aptos"
}

export const chainKeyToPlatform = (chainKey: string): Platform => {
    switch (chainKey) {
    case "avalanche":
        return Platform.Evm
    default:
        throw new ChainKeyNotFoundException(chainKey)
    }
}
