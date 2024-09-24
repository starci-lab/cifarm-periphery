import { Contract, JsonRpcProvider } from "ethers"
import { aptosClient, evmHttpRpcUrl, solanaHttpRpcUrl } from "../../rpcs"
import { erc721Abi } from "../../abis"
import { Network, Platform, chainKeyToPlatform } from "@/config"
import { PlatformNotFoundException } from "@/exceptions"
import { MulticallProvider } from "@ethers-ext/provider-multicall"
import { NftData } from "../common"
import { Connection, PublicKey, ParsedAccountData } from "@solana/web3.js"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata"
import { publicKey } from "@metaplex-foundation/umi"

export interface GetNftsByTokenIdsParams {
    tokenIds: Array<string>,
    nftAddress: string,
    chainKey: string,
    network: Network
}

export interface GetNftsByTokenIdsResult {
    records: Array<NftData>,
}

export const _getEvmNftsByTokenIds = async ({
    nftAddress,
    chainKey,
    network,
    tokenIds,
}: GetNftsByTokenIdsParams): Promise<GetNftsByTokenIdsResult> => {
    const rpc = evmHttpRpcUrl(chainKey, network)
    const provider = new JsonRpcProvider(rpc)
    const multicaller = new MulticallProvider(provider)
    const multicallerContract = new Contract(nftAddress, erc721Abi, multicaller)

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
                records.push({
                    ownerAddress,
                    tokenId,
                    tokenURI
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
}: GetNftsByTokenIdsParams): Promise<GetNftsByTokenIdsResult> => {
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
                records.push({
                    ownerAddress: (largestAccountInfo.value.data as ParsedAccountData).parsed.info.owner,
                    tokenId,
                    tokenURI: digitalAsset.metadata.uri,
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
}: GetNftsByTokenIdsParams): Promise<GetNftsByTokenIdsResult> => {
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
                records.push({
                    ownerAddress: ownership.owner_address,
                    tokenId,
                    tokenURI: digitalAsset.token_uri,
                })
            })(),
        ) 
    }
    await Promise.all(promises)
    
    return {
        records
    }
}

export const _getNftsByTokenIds = (params: GetNftsByTokenIdsParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        return _getEvmNftsByTokenIds(params)
    }
    case Platform.Solana: {
        return _getSolanaNftsByTokenIds(params)
    }
    case Platform.Aptos: {
        return _getAptosNftsByTokenIds(params)
    }
    default:
        throw new PlatformNotFoundException(platform)
    }
}
