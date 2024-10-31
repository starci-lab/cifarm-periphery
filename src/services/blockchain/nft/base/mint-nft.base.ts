import {
    blockchainConfig,
    chainKeyToPlatform,
    Network,
    Platform,
    SupportedChainKey,
} from "@/config"
import { nearClient, nearKeyPair, nearKeyStore } from "../../rpcs"
import { computeRaw, TransactionResult } from "@/utils"
import { NearNftMetadata } from "../common"
import { ChainCredentialsService } from "../../../initialize"

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

//services from dependency injection
export interface MintNftServices {
    chainCredentialsService?: ChainCredentialsService;
  }
  

export interface MintNftResult extends TransactionResult {
  //tokenId
  tokenId: string;
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
}: MintNftParams, { chainCredentialsService }: MintNftServices): Promise<MintNftResult> => {
    //near configuration
    const { privateKey, accountId } = chainCredentialsService.config.near.nftMinter[network]

    const keyPair = nearKeyPair(privateKey)
    const storageKey = nearKeyStore({ accountId, network, keyPair })
    const client = await nearClient(network, storageKey)
    const account = await client.account(accountId)
    //default
    const { nftCollections, decimals } = blockchainConfig()[chainKey]
    const nftCollectionId = nftCollections[nftCollectionKey][network].collectionId

    const { defaultImageUrl, defaultTitlePrefix } =
    nftCollections[nftCollectionKey][network]

    const metadata: NearNftMetadata = {
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

export const _mintNft = async (
    params: MintNftParams,
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
        return _mintNearNft(params, services)
    }
    default:
        throw new Error(`Unsupported platform ${platform}`)
    }
}
