import { Contract, JsonRpcProvider } from "ethers"
import { evmHttpRpcUrl } from "../../rpcs"
import { erc721Abi } from "../../abis"
import { Network, Platform, chainKeyToPlatform } from "@/config"
import { PlatformNotFoundException } from "@/exceptions"
import { MulticallProvider } from "@ethers-ext/provider-multicall"
import { NftData } from "../common"

export interface GetNftsByTokenIdsParams {
    tokenIds: Array<number>,
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

export const _getNftsByTokenIds = (params: GetNftsByTokenIdsParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        return _getEvmNftsByTokenIds(params)
    }
    default:
        throw new PlatformNotFoundException(platform)
    }
}
