import {
    blockchainConfig,
    chainKeyToPlatform,
    envConfig,
    Network,
    Platform,
    SupportedChainKey,
} from "@/config"
import { nearClient, nearKeyPair, nearKeyStore } from "../../rpcs"
import { computeRaw, TransactionResult } from "@/utils"
import { IpfsService } from "../common"

export interface MintNftParams {
  //specify other or not, since some blockchains may not require it
  tokenId?: string;
  nftCollectionKey: string;
  //override default values
  imageUrl?: string;
  //serialized properties
  properties?: string;
  //to
  toAddress: string;
  //network
  network: Network;
  //chainKey
  chainKey: SupportedChainKey;
  //title, otherwise default
  title?: string;
  //description, otherwise empty
  description?: string;
}

export interface MintNftResult extends TransactionResult {
  //tokenId
  tokenId: string;
}

//services from dependency injection
export interface MintNftServices {
  ipfsService: IpfsService;
}

export const _mintNearNft = async ({
    tokenId,
    nftCollectionKey,
    imageUrl,
    properties,
    toAddress,
    network,
    chainKey,
    title,
    description,
}: MintNftParams): Promise<MintNftResult> => {
    //near configuration
    const { privateKey, accountId } = envConfig().secrets.chainCredentials.near.nftMinter
    const keyPair = nearKeyPair(privateKey)
    const storageKey = nearKeyStore({ accountId, network, keyPair })
    const client = await nearClient(network, storageKey)
    const account = await client.account(accountId)
    //default
    const { nftCollections, decimals } = blockchainConfig()[chainKey]
    const nftCollectionId = nftCollections[nftCollectionKey][network].collectionId

    const { defaultImageUrl, defaultTitlePrefix } =
    nftCollections[nftCollectionKey][network]

    const metadata: NearTokenMetadata = {
        media: imageUrl || defaultImageUrl,
        extra: properties,
        starts_at: Date.now().toString(),
        title: title || `${defaultTitlePrefix}${tokenId}`,
        copies: 1,
        description,
    }

    const {
        transaction_outcome: { id },
    } = await account.functionCall({
        contractId: nftCollectionId,
        methodName: "nft_mint",
        args: {
            //tokenId
            token_id: tokenId,
            receiver_id: toAddress,
            token_metadata: metadata,
        },
        //near is special blockchain, so we need to attach some NEAR tokens
        attachedDeposit: computeRaw(0.1, decimals),
    })

    return {
        tokenId,
        transactionHash: id,
    }
}

export type NearTokenMetadata = {
  title?: string; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
  description?: string; // free-form description
  media?: string; // URL to associated media, preferably to decentralized, content-addressed storage
  media_hash?: string; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
  copies?: number; // number of copies of this set of metadata in existence when token was minted.
  issued_at?: string; // When token was issued or minted, Unix epoch in milliseconds
  expires_at?: string; // When token expires, Unix epoch in milliseconds
  starts_at?: string; // When token starts being valid, Unix epoch in milliseconds
  updated_at?: string; // When token was last updated, Unix epoch in milliseconds
  extra?: string; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
  reference?: string; // URL to an off-chain JSON file with more info.
  reference_hash?: string; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
};  

export const _mintNft = async (
    params: MintNftParams,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    services: MintNftServices,
) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        throw new Error(`Unsupported platform ${platform}`)
    }
    case Platform.Solana: {
        throw new Error(`Unsupported platform ${platform}`)
    }
    case Platform.Aptos: {
        throw new Error(`Unsupported platform ${platform}`)
    }
    case Platform.Algorand: {
        throw new Error(`Unsupported platform ${platform}`)
    }
    case Platform.Polkadot: {
        throw new Error(`Unsupported platform ${platform}`)
    }
    case Platform.Near: {
        return _mintNearNft(params)
    }
    default:
        throw new Error(`Unsupported platform ${platform}`)
    }
}
