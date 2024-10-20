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
    solana: {
        nfts: {
            premiumTile: {
                addresses: {
                    [Network.Mainnet]: "",
                    [Network.Testnet]: "E31eadBc4uLfcHRSCLVVDPVngPavmZDVjzdGdjyCkbWZ",
                },
            },
        }
    },
    aptos: {
        nfts: {
            premiumTile: {
                addresses: {
                    [Network.Mainnet]: "",
                    [Network.Testnet]: "0x2a86d07b6f49e8794051580e107d96f6feed0d27b52359e8d8c62af32c07cc34",
                },
            },
        }
    }
})

export const defaultChainKey = Object.keys(blockchainConfig())[0]
export const defaultNftKey = Object.keys(blockchainConfig()[defaultChainKey].nfts)[0]


export enum Platform {
  Evm = "evm",
  Solana = "solana",
  Aptos = "aptos",
  Algorand = "algorand",
}

export const chainKeyToPlatform = (chainKey: string): Platform => {
    switch (chainKey) {
    case "avalanche":
        return Platform.Evm
    case "solana":
        return Platform.Solana
    case "aptos":
        return Platform.Aptos
    case "algorand":
        return Platform.Algorand
    default:
        throw new ChainKeyNotFoundException(chainKey)
    }
}
