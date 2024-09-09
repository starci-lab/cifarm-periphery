import { Network } from "@/config"

export const AVALANCHE_TESTNET_RPC_URL =
  "https://api.avax-test.network/ext/bc/C/rpc"
export const AVALANCHE_MAINNET_RPC_URL =
  "https://api.avax.network/ext/bc/C/rpc"

export const avalancheRpc = (network: Network) => {
    let rpcUrl = ""
    switch (network) {
    case Network.Mainnet: {
        rpcUrl = AVALANCHE_MAINNET_RPC_URL
        break
    }
    case Network.Testnet: {
        rpcUrl = AVALANCHE_TESTNET_RPC_URL
        break
    }
    }
    return rpcUrl
}
