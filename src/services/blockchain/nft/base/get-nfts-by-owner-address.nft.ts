import { Contract, JsonRpcProvider } from "ethers"
import { evmHttpRpcUrl } from "../../rpcs"
import { erc721Abi } from "../../abis"
import { Network, Platform, chainKeyToPlatform } from "@/config"
import { PlatformNotFoundException } from "@/exceptions"
import { MulticallProvider } from "@ethers-ext/provider-multicall"
import { NftData } from "../common"

export interface GetNftsByOwnerAddressParams {
    accountAddress: string,
    nftAddress: string,
    chainKey: string,
    network: Network
    skip: number
    take: number
}

export interface GetNftsByOwnerAddressResult {
    records: Array<NftData>,
    count: number
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
    const tokenIds: Array<number> = []
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
                tokenIds.push(Number(tokenId))
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
                    ownerAddress: accountAddress
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

export const _getNftsByOwnerAddress = (params: GetNftsByOwnerAddressParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        return _getEvmNftsByOwnerAddress(params)
    }
    default:
        throw new PlatformNotFoundException(platform)
    }
}
