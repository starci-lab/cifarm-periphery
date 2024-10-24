import { ChainKeyNotFoundException } from "@/exceptions"

export enum Network {
  Testnet = "testnet",
  Mainnet = "mainnet",
}

export interface NftCollectionInfo {
    collectionId: string
}

export enum NftCollectionKey {
    //đất phù sa
    FertileTile = "fertileTile",
    //bò
    Cow = "cow",
}
export interface ChainIfo {
    nftCollections: Record<string, Record<Network, NftCollectionInfo>>
}

export enum SupportedChainKey {
    Sui = "sui",
    Aptos = "aptos",
    Avalanche = "avalanche",
    Solana = "solana",
    Bsc = "bsc",
    Algorand = "algorand",
    Polkadot = "polkadot",
  }

export type BlockchainConfig = Record<string, ChainIfo>
export const blockchainConfig = (): BlockchainConfig => ({
    [SupportedChainKey.Avalanche]: {
        nftCollections: {
            [NftCollectionKey.FertileTile]: {
                [Network.Mainnet]: {
                    collectionId: ""
                },
                [Network.Testnet]: {
                    collectionId: "0x2a86d07b6f49e8794051580e107d96f6feed0d27b52359e8d8c62af32c07cc34"
                }
            },
        },
    },
    [SupportedChainKey.Solana]: {
        nftCollections: {
            [NftCollectionKey.FertileTile]: {
                [Network.Mainnet]: {
                    collectionId: ""
                },
                [Network.Testnet]: {
                    collectionId: "E31eadBc4uLfcHRSCLVVDPVngPavmZDVjzdGdjyCkbWZ"
                }
            },
        },
    },
    [SupportedChainKey.Aptos]: {
        nftCollections: {
            [NftCollectionKey.FertileTile]: {
                [Network.Mainnet]: {
                    collectionId: ""
                },
                [Network.Testnet]: {
                    collectionId: "0x2a86d07b6f49e8794051580e107d96f6feed0d27b52359e8d8c62af32c07cc34"
                }
            },
        },
    },
    [SupportedChainKey.Algorand]: {
        nftCollections: {
            [NftCollectionKey.FertileTile]: {
                [Network.Mainnet]: {
                    collectionId: ""
                },
                [Network.Testnet]: {
                    collectionId: "premiumTile1"
                }
            },
        },
    },
    [SupportedChainKey.Polkadot]: {
        nftCollections: {
            [NftCollectionKey.FertileTile]: {
                [Network.Mainnet]: {
                    collectionId: ""
                },
                [Network.Testnet]: {
                    collectionId: "4191"
                }
            },
        },
    }
})

export const defaultChainKey = Object.keys(blockchainConfig())[0]
export const defaultNftCollectionKey = Object.keys(blockchainConfig()[defaultChainKey].nftCollections)[0]


export enum Platform {
  Evm = "evm",
  Solana = "solana",
  Aptos = "aptos",
  Algorand = "algorand",
  Polkadot = "polkadot",
}

export const chainKeyToPlatform = (chainKey: string): Platform => {
    switch (chainKey) {
    case SupportedChainKey.Avalanche:
        return Platform.Evm
    case SupportedChainKey.Solana:
        return Platform.Solana
    case SupportedChainKey.Aptos:
        return Platform.Aptos
    case SupportedChainKey.Algorand:
        return Platform.Algorand
    case SupportedChainKey.Polkadot:
        return Platform.Polkadot
    default:
        throw new ChainKeyNotFoundException(chainKey)
    }
}