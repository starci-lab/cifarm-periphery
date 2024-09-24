import { Contract, JsonRpcProvider } from "ethers"
import { aptosClient, evmHttpRpcUrl, solanaHttpRpcUrl } from "../../rpcs"
import { fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata"
import { publicKey } from "@metaplex-foundation/umi"
import { Connection, PublicKey, ParsedAccountData } from "@solana/web3.js"
import { erc721Abi } from "../../abis"
import { Network, Platform, chainKeyToPlatform } from "@/config"
import { PlatformNotFoundException } from "@/exceptions"
import { MulticallProvider } from "@ethers-ext/provider-multicall"
import { NftData } from "../common"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"

export interface GetNftByTokenIdParams {
    tokenId: string,
    nftAddress: string,
    chainKey: string,
    network: Network
}

export const _getEvmNftByTokenId = async ({
    nftAddress,
    chainKey,
    network,
    tokenId,
}: GetNftByTokenIdParams): Promise<NftData> => {
    const rpc = evmHttpRpcUrl(chainKey, network)
    const provider = new JsonRpcProvider(rpc)
    const multicaller = new MulticallProvider(provider)
    const multicallerContract = new Contract(nftAddress, erc721Abi, multicaller)

    const [ ownerAddress, tokenURI ] = await Promise.all([
        multicallerContract
            .getFunction("ownerOf")
            .staticCall(tokenId),
        multicallerContract
            .getFunction("tokenURI")
            .staticCall(tokenId)
    ])

    return {
        ownerAddress,
        tokenId,
        tokenURI
    }
}

export const _getSolanaNftByTokenId = async ({
    chainKey,
    network,
    tokenId,
}: GetNftByTokenIdParams): Promise<NftData> => {
    const rpc = solanaHttpRpcUrl(chainKey, network)
    const connection = new Connection(rpc, "confirmed")
    const umi = createUmi(rpc)
    const [largestAccounts, digitalAsset] = await Promise.all([
        connection.getTokenLargestAccounts(new PublicKey(tokenId)),
        fetchDigitalAsset(umi, publicKey(tokenId))
    ])
    const largestAccountInfo = await connection.getParsedAccountInfo(
        largestAccounts.value[0].address
    )
    return {
        ownerAddress: (largestAccountInfo.value.data as ParsedAccountData).parsed.info.owner,
        tokenId,
        tokenURI: digitalAsset.metadata.uri,
    }
}

export const _getAptosNftByTokenId = async ({
    network,
    tokenId,
}: GetNftByTokenIdParams): Promise<NftData> => {
    const client = aptosClient(network)

    const [digitalAsset, ownership] = await Promise.all([
        client.getDigitalAssetData({
            digitalAssetAddress: tokenId,
        }),
        client.getCurrentDigitalAssetOwnership({
            digitalAssetAddress: tokenId,
        })
    ]) 
    
    return {
        ownerAddress: ownership.owner_address,
        tokenId,
        tokenURI: digitalAsset.token_uri,
    }
}

export const _getNftByTokenId = (params: GetNftByTokenIdParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        return _getEvmNftByTokenId(params)
    }
    case Platform.Solana: {
        return _getSolanaNftByTokenId(params)
    }
    case Platform.Aptos: {
        return _getAptosNftByTokenId(params)
    }
    default:
        throw new PlatformNotFoundException(platform)
    }
}
