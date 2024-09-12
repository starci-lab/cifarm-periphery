import { blockchainConfig } from "@/config"
import { NftTransferSchema } from "@/database"
import { BlockchainNftObserverService } from "@/services"
import { Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Timeout } from "@nestjs/schedule"
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Network, ContractEventPayload } from "ethers"
import { Model } from "mongoose"
import { Server } from "socket.io"

@WebSocketGateway({
    cors: {
        origin: "*",
    },
})
export class NftTranferGateway {
  @WebSocketServer()
      server: Server

  private readonly logger = new Logger(NftTranferGateway.name)

  constructor(
    @InjectModel(NftTransferSchema.name)
    private nftTransferSchema: Model<NftTransferSchema>,
    private readonly blockchainNftObserverService: BlockchainNftObserverService,
  ) {}

  @Timeout(0)
  async observeEvmNftTransfers() {
      const chainKeys = Object.keys(blockchainConfig())
      const networks = Object.values(Network)
      for (const chainKey of chainKeys) {
          for (const network of networks) {
              const nftAddresses = Object.values(
                  blockchainConfig()[chainKey].nfts,
              ).map(({ addresses }) => addresses[network])
              for (const nftAddress of nftAddresses) {
                  if (!nftAddress) continue

                  const nftKey = Object.entries(blockchainConfig()[chainKey].nfts).find(
                      ([, value]) => value[network] === nftAddress,
                  )[0]
                  this.blockchainNftObserverService.observeEvm({
                      chainKey,
                      network,
                      nftAddress,
                      eventName: "Transfer",
                      callbackFn: async (
                          from: string,
                          to: string,
                          tokenId: bigint,
                          payload: ContractEventPayload,
                      ) => {
                          const transactionHash = payload.log.transactionHash
                          this.logger.verbose(
                              `NFT Transfer found: ${transactionHash} ${chainKey}`,
                          )
                          await this.nftTransferSchema.create({
                              raw: payload,
                              from,
                              to,
                              tokenId: Number(tokenId),
                              transactionHash,
                          })
                          this.server.emit("nft-transfer-observed", {
                              from,
                              to,
                              tokenId,
                              chainKey,
                              nftKey,
                          })
                      },
                  })
              }
          }
      }
  }
}
