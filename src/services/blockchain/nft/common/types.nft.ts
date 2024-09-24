import { Network } from "@/config"


export interface GetContractObservableParams {
    nftAddress: string,
    chainKey: string,
    network: Network,
    eventName: string,
    callbackFn: (...args: Array<unknown>) => void | Promise<void>
} 


export interface NftData {
    ownerAddress: string,
    tokenId: string,
    tokenURI: string
}

