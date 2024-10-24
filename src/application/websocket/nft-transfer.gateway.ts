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
                  const nftCollectionIds = Object.values(
                      blockchainConfig()[chainKey].nftCollections[network],
                  ).map(({ collectionId }) => collectionId)
                  for (const nftCollectionId of nftCollectionIds) {
                      if (!nftCollectionId) continue
                      const keys = Object.keys(blockchainConfig()[chainKey].nftCollections[nftCollectionId][network])
      
                      let nftCollectionKey = ""
                      for (const key of keys) {
                          if (
                              blockchainConfig()[chainKey].nftCollections[key][network].collectionId ===
                    nftCollectionId
                          )
                              nftCollectionKey = key
                          break
                      }
      
                      this.blockchainNftObserverService.observeEvm({
                          chainKey,
                          network,
                          nftCollectionId,
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
                                  nftCollectionKey,
                                  nftCollectionId
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
