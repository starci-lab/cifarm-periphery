import { Network, Platform, blockchainConfig, chainKeyToPlatform } from "@/config"
import { NftTransferSchema } from "@/database"
import { BlockchainNftObserverService } from "@/services"
import { Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Timeout } from "@nestjs/schedule"
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { ContractEventPayload } from "ethers"
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
  public async observeEvmNftTransfers() {
      const chainKeys = Object.keys(blockchainConfig())
      const networks = Object.values(Network)
      for (const chainKey of chainKeys) {
          const platform = chainKeyToPlatform(chainKey)
          switch (platform) {
          case Platform.Evm: {
              for (const network of networks) {
                  const nftAddresses = Object.values(
                      blockchainConfig()[chainKey].nfts,
                  ).map(({ addresses }) => addresses[network])
                  for (const nftAddress of nftAddresses) {
                      if (!nftAddress) continue
                      const keys = Object.keys(blockchainConfig()[chainKey].nfts)
      
                      let nftKey = ""
                      for (const key of keys) {
                          if (
                              blockchainConfig()[chainKey].nfts[key].addresses[network] ===
                    nftAddress
                          )
                              nftKey = key
                          break
                      }
      
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
                              const object = await this.nftTransferSchema.create({
                                  raw: payload,
                                  from,
                                  to,
                                  tokenId: Number(tokenId),
                                  transactionHash,
                                  chainKey,
                                  network,
                                  nftAddress,
                                  nftKey
                              })
                              this.server.emit("nft-transfer-observed", object)
                          },
                      })
                  }
              }
          }
          }
      }
  }
}
