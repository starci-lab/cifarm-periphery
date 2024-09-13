import { Contract, JsonRpcProvider } from "ethers"
import { evmHttpRpcUrl } from "../../rpcs"
import { erc721Abi } from "../../abis"
import { Network, Platform, chainKeyToPlatform } from "@/config"
import { PlatformNotFoundException } from "@/exceptions"
import { MulticallProvider } from "@ethers-ext/provider-multicall"
import { NftData } from "../common"

export interface GetNftByTokenIdParams {
    tokenId: number,
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

export const _getNftByTokenId = (params: GetNftByTokenIdParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        return _getEvmNftByTokenId(params)
    }
    default:
        throw new PlatformNotFoundException(platform)
    }
}
