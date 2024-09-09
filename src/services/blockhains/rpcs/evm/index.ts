import { Network } from "@/config"
import { avalancheRpc } from "./avalanche.evm"

export const evmRpc = (chainKey: string, network: Network) => {
    switch (chainKey) {
    case "avalanche": {
        return avalancheRpc(network)
    }
    default: throw new Error(`Chain not supported: ${chainKey}`)
    }
}