import { Contract, JsonRpcProvider } from "ethers"
import { aptosClient, evmHttpRpcUrl, solanaHttpRpcUrl } from "../../rpcs"
import { erc721Abi } from "../../abis"
import { Network, Platform, chainKeyToPlatform } from "@/config"
import { PlatformNotFoundException } from "@/exceptions"
import { MulticallProvider } from "@ethers-ext/provider-multicall"
import { NftData } from "../common"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { fetchAllDigitalAssetByOwner } from "@metaplex-foundation/mpl-token-metadata"
import { publicKey, isSome } from "@metaplex-foundation/umi"

export interface GetNftsByOwnerAddressParams {
  accountAddress: string;
  nftAddress: string;
  chainKey: string;
  network: Network;
  skip: number;
  take: number;
}

export interface GetNftsByOwnerAddressResult {
  records: Array<NftData>;
  count: number;
}

export const _getEvmNftsByOwnerAddress = async ({
    nftAddress,
    chainKey,
    network,
    accountAddress,
    skip,
    take,
}: GetNftsByOwnerAddressParams): Promise<GetNftsByOwnerAddressResult> => {
    const rpc = evmHttpRpcUrl(chainKey, network)
    const provider = new JsonRpcProvider(rpc)
    const contract = new Contract(nftAddress, erc721Abi, provider)
    const balance = Number(
        await contract.getFunction("balanceOf").staticCall(accountAddress),
    )

    const multicaller = new MulticallProvider(provider)
    const multicallerContract = new Contract(nftAddress, erc721Abi, multicaller)

    const promises: Array<Promise<void>> = []
    const tokenIds: Array<string> = []
    for (
        let index = skip || 0;
        index < (take ? Math.min(balance, (skip || 0) + take) : balance);
        index++
    ) {
        promises.push(
            (async () => {
                const tokenId = await multicallerContract
                    .getFunction("tokenOfOwnerByIndex")
                    .staticCall(accountAddress, index)
                tokenIds.push(tokenId)
            })(),
        )
    }
    await Promise.all(promises)

    const records: Array<NftData> = []
    for (const tokenId of tokenIds) {
        promises.push(
            (async () => {
                const tokenURI = await multicallerContract
                    .getFunction("tokenURI")
                    .staticCall(tokenId)
                records.push({
                    tokenId,
                    tokenURI,
                    ownerAddress: accountAddress,
                })
            })(),
        )
    }
    await Promise.all(promises)

    return {
        count: balance,
        records,
    }
}

export const _getSolanaNftsByOwnerAddress = async ({
    nftAddress,
    chainKey,
    network,
    accountAddress,
    skip,
    take,
}: GetNftsByOwnerAddressParams): Promise<GetNftsByOwnerAddressResult> => {
    const rpc = solanaHttpRpcUrl(chainKey, network)
    const umi = createUmi(rpc)

    let nfts = await fetchAllDigitalAssetByOwner(umi, publicKey(accountAddress))
    nfts = nfts.filter((nft) => {
        if (isSome(nft.metadata.collection)) {
            return nft.metadata.collection.value.key.toString() === nftAddress
        }
        return false
    })

    const records: Array<NftData> = nfts
        .map((nft) => ({
            tokenId: nft.metadata.mint.toString(),
            tokenURI: nft.metadata.uri,
            ownerAddress: accountAddress,
        }))
        .slice(skip ? skip : undefined, take ? take : undefined)
    return {
        records,
        count: nfts.length,
    }
}

export const _getAptosNftsByOwnerAddress = async ({
    nftAddress,
    network,
    accountAddress,
    skip,
    take,
}: GetNftsByOwnerAddressParams): Promise<GetNftsByOwnerAddressResult> => {
    const client = aptosClient(network)

    let nfts = await client.getAccountOwnedTokensFromCollectionAddress({
        accountAddress,
        collectionAddress: nftAddress,
    })
    nfts = nfts.slice(skip ? skip : undefined, take ? take : undefined)

    const promises: Array<Promise<void>> = []
    const records: Array<NftData> = []

    for (const nft of nfts) {
        const promise = async () => {
            const digitalAsset = await client.getDigitalAssetData({
                digitalAssetAddress: nft.token_data_id,
            })
            records.push({
                ownerAddress: accountAddress,
                tokenId: nft.token_data_id,
                tokenURI: digitalAsset.token_uri,
            })
        }
        promises.push(promise())
    }
    await Promise.all(promises)
    return {
        records,
        count: nfts.length,
    }
}

export const _getNftsByOwnerAddress = (params: GetNftsByOwnerAddressParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        return _getEvmNftsByOwnerAddress(params)
    }
    case Platform.Solana: {
        return _getSolanaNftsByOwnerAddress(params)
    }
    case Platform.Aptos: {
        return _getAptosNftsByOwnerAddress(params)
    }
    default:
        throw new PlatformNotFoundException(platform)
    }
}
