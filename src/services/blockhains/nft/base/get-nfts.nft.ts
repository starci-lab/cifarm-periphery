import { Contract, JsonRpcProvider } from "ethers"
import { evmHttpRpcUrl } from "../../rpcs"
import { GetNftsParams } from "../types.nft"
import { erc721Abi } from "../../abi"
import { Platform, chainKeyToPlatform } from "@/config"
import { PlatformNotFoundException } from "@/exceptions"
import { MulticallProvider } from "@ethers-ext/provider-multicall"

export interface Nft {
    tokenId: number,
    tokenURI: string
}

export const _getEvmNfts = async ({
    nftAddress,
    chainKey,
    network,
    accountAddress,
}: GetNftsParams) => {
    const rpc = evmHttpRpcUrl(chainKey, network)
    const provider = new JsonRpcProvider(rpc)
    const contract = new Contract(nftAddress, erc721Abi, provider)
    const balance = await contract
        .getFunction("balanceOf")
        .staticCall(accountAddress)

    const multicaller = new MulticallProvider(provider)
    const multicallerContract = new Contract(nftAddress, erc721Abi, multicaller)

    const promises: Array<Promise<void>> = []
    const tokenIds: Array<number> = []
    for (let index = 0; index < Number(balance); index++) {
        promises.push(
            (async () => {
                const tokenId = await multicallerContract
                    .getFunction("tokenOfOwnerByIndex")
                    .staticCall(accountAddress, index)
                tokenIds.push(Number(tokenId))
            })(),
        )
    }
    await Promise.all(promises)

    const results: Array<Nft> = []
    for (const tokenId of tokenIds) {
        promises.push(
            (async () => {
                const tokenURI = await multicallerContract
                    .getFunction("tokenURI")
                    .staticCall(tokenId)
                results.push({
                    tokenId,
                    tokenURI
                })
            })(),
        )
    }
    await Promise.all(promises)

    return results
}

export const _getNfts = (params: GetNftsParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        return _getEvmNfts(params)
    }
    default:
        throw new PlatformNotFoundException(platform)
    }
}
