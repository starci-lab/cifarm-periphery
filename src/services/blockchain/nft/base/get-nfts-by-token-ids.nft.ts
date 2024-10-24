import { Contract, JsonRpcProvider } from "ethers"
import { algorandAlgodClient, algorandIndexerClient, aptosClient, evmHttpRpcUrl, polkadotUniqueNetworkIndexerClient, solanaHttpRpcUrl } from "../../rpcs"
import { erc721Abi } from "../../abis"
import { Network, Platform, chainKeyToPlatform } from "@/config"
import { PlatformNotFoundException } from "@/exceptions"
import { MulticallProvider } from "@ethers-ext/provider-multicall"
import { NftData } from "../common"
import { Connection, PublicKey, ParsedAccountData } from "@solana/web3.js"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata"
import { publicKey } from "@metaplex-foundation/umi"
import { CIDService, FetchService } from "../../../base"
import { Atomic } from "@/utils"

export interface GetNftsByTokenIdsParams {
    tokenIds: Array<string>,
    nftCollectionId: string,
    chainKey: string,
    network: Network
}

//services from dependency injection
export interface GetNftsByTokenIdsServices {
    cidService?: CIDService;
    fetchService?: FetchService;
}
  

export interface GetNftsByTokenIdsResult {
    records: Array<NftData>,
}

export const _getEvmNftsByTokenIds = async ({
    nftCollectionId,
    chainKey,
    network,
    tokenIds,
}: GetNftsByTokenIdsParams, { fetchService }: GetNftsByTokenIdsServices): Promise<GetNftsByTokenIdsResult> => {
    const rpc = evmHttpRpcUrl(chainKey, network)
    const provider = new JsonRpcProvider(rpc)
    const multicaller = new MulticallProvider(provider)
    const multicallerContract = new Contract(nftCollectionId, erc721Abi, multicaller)

    const records: Array<NftData> = []
    const promises: Array<Promise<void>> = []
    for (
        const tokenId of tokenIds
    ) {
        promises.push(
            (async () => {
                const [ ownerAddress, tokenURI ] = await Promise.all([
                    multicallerContract
                        .getFunction("ownerOf")
                        .staticCall(tokenId),
                    multicallerContract
                        .getFunction("tokenURI")
                        .staticCall(tokenId)
                ])
                const metadata = await fetchService.fetch(tokenURI)
                records.push({
                    ownerAddress,
                    tokenId,
                    metadata: {
                        image: metadata.image,
                        properties: JSON.stringify(metadata.properties),
                    }
                })
            })(),
        )
    }
    await Promise.all(promises)

    return {
        records
    }
}

export const _getSolanaNftsByTokenIds = async ({
    chainKey,
    network,
    tokenIds,
}: GetNftsByTokenIdsParams, { fetchService }: GetNftsByTokenIdsServices): Promise<GetNftsByTokenIdsResult> => {
    const rpc = solanaHttpRpcUrl(chainKey, network)
    const connection = new Connection(rpc, "confirmed")
    const umi = createUmi(rpc)

    const records: Array<NftData> = []
    const promises: Array<Promise<void>> = [] 
    for (const tokenId of tokenIds) {
        promises.push(
            (async () => {
                const [largestAccounts, digitalAsset] = await Promise.all([
                    connection.getTokenLargestAccounts(new PublicKey(tokenId)),
                    fetchDigitalAsset(umi, publicKey(tokenId))
                ])
                const largestAccountInfo = await connection.getParsedAccountInfo(
                    largestAccounts.value[0].address
                )

                const metadata = await fetchService.fetch(digitalAsset.metadata.uri)
                records.push({
                    ownerAddress: (largestAccountInfo.value.data as ParsedAccountData).parsed.info.owner,
                    tokenId,
                    metadata: {
                        image: metadata.image,
                        properties: JSON.stringify(metadata.properties),
                    },
                })
            })(),
        )
    }
    await Promise.all(promises)
    return {
        records
    }
}

export const _getAptosNftsByTokenIds = async ({
    network,
    tokenIds,
}: GetNftsByTokenIdsParams, { fetchService }: GetNftsByTokenIdsServices): Promise<GetNftsByTokenIdsResult> => {
    const client = aptosClient(network)
    const records: Array<NftData> = []
    const promises: Array<Promise<void>> = [] 
    for (const tokenId of tokenIds) {
        promises.push(
            (async () => {
                const [digitalAsset, ownership] = await Promise.all([
                    client.getDigitalAssetData({
                        digitalAssetAddress: tokenId,
                    }),
                    client.getCurrentDigitalAssetOwnership({
                        digitalAssetAddress: tokenId,
                    })
                ]) 

                const metadata = await fetchService.fetch(digitalAsset.token_uri)
                records.push({
                    ownerAddress: ownership.owner_address,
                    tokenId,
                    metadata: {
                        image: metadata.image,
                        properties: JSON.stringify(metadata.properties),
                    },
                })
            })(),
        ) 
    }
    await Promise.all(promises)
    
    return {
        records
    }
}

export const _getAlgorandNftsByTokenIds = async ({
    tokenIds,
    network,
}: GetNftsByTokenIdsParams, { cidService }: GetNftsByTokenIdsServices): Promise<GetNftsByTokenIdsResult> => {
    const algodClient = algorandAlgodClient(network)
    const indexerClient = algorandIndexerClient(network)
    const records: Array<NftData> = []
    const promises: Array<Promise<void>> = [] 
    for (const tokenId of tokenIds) {
        promises.push(
            (async () => {
                const { balances } = await indexerClient.lookupAssetBalances(Number(tokenId)).do()
                const ownerAddress = balances[0].address
                const { params } = await algodClient.getAssetByID(Number(tokenId)).do()
                const cid = cidService.algorandReserveAddressToCid(params.reserve)
                const metadata = await cidService.getCidContent(cid)

                records.push({
                    ownerAddress,
                    tokenId,
                    metadata: {
                        image: metadata.image,
                        properties: JSON.stringify(metadata.properties),
                    },
                })
            })(),
        ) 
    }
    await Promise.all(promises)
    
    return {
        records
    }
}

export const _getPolkadotUniqueNetworkNftsByTokenIds = async ({
    tokenIds,
    network,
    nftCollectionId,
}: GetNftsByTokenIdsParams): Promise<GetNftsByTokenIdsResult> => {
    const indexerClient = polkadotUniqueNetworkIndexerClient(network)
    
    const searchNfts = await indexerClient.nfts({
        tokenIdIn: tokenIds.map(tokenId => Number(tokenId)),
        collectionIdIn: [nftCollectionId],
    })

    const records: Array<NftData> = searchNfts.items.map(searchNft => {
        const properties: Record<string, Atomic> = {}
        for (const property of searchNft.attributes) {
            properties[property.trait_type] = property.value
        }
        return {
            ownerAddress: searchNft.owner,
            tokenId: searchNft.tokenId.toString(),
            metadata: {
                image: searchNft.image,
                properties: JSON.stringify(properties),
            }}
    })

    return {
        records,
    }
}

export const _getNftsByTokenIds = (params: GetNftsByTokenIdsParams, services: GetNftsByTokenIdsServices) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        return _getEvmNftsByTokenIds(params, services)
    }
    case Platform.Solana: {
        return _getSolanaNftsByTokenIds(params, services)
    }
    case Platform.Aptos: {
        return _getAptosNftsByTokenIds(params, services)
    }
    case Platform.Algorand: {
        return _getAlgorandNftsByTokenIds(params, services)
    }
    case Platform.Polkadot: {
        return _getPolkadotUniqueNetworkNftsByTokenIds(params)
    }
    default:
        throw new PlatformNotFoundException(platform)
    }
}
