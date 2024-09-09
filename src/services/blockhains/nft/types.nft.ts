import { Network } from "@/config"

export interface GetNftsParams {
    accountAddress: string,
    nftAddress: string,
    chainKey: string,
    network: Network
    skip: number
    take: number
}

export interface NftResult {
    tokenId: number,
    tokenURI: string
}

export interface GetNftsResult {
    records: Array<NftResult>,
    count: number
}

export interface GetContractObservableParams {
    nftAddress: string,
    chainKey: string,
    network: Network,
    eventName: string,
    callbackFn: (...args: Array<unknown>) => void | Promise<void>
} 

