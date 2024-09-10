// import { Test } from "@nestjs/testing"
// import { envConfig } from "@/config"
// import { ConfigModule } from "@nestjs/config"
// import { AuthenticatorControllerService } from "./authenticator.service"
// import { AptosService, CommonModule, EvmService } from "../common"
// import { Account } from "@aptos-labs/ts-sdk"
// import { Chain } from "@/types"
// import { Wallet } from "ethers"
// import { CacheModule } from "@nestjs/cache-manager"
// import * as redisStore from "cache-manager-redis-store"

// describe("AuthenticatorControllerService", () => {
//     let service: AuthenticatorControllerService
//     let aptosService: AptosService
//     let evmService: EvmService

//     beforeEach(async () => {
//         const module = await Test.createTestingModule({
//             imports: [
//                 ConfigModule.forRoot({
//                     load: [envConfig],
//                     isGlobal: true,
//                 }),
//                 CommonModule,
//                 CacheModule.register({
//                     store: redisStore,
//                     ttl: 1000 * 15, 
//                     isGlobal: true,
//                     host: envConfig().redis.host,
//                     port: envConfig().redis.port,
//                 }),
//             ],
//             providers: [ AuthenticatorControllerService ]
//         }).compile()

//         service = module.get(AuthenticatorControllerService)
//         aptosService = module.get(AptosService)
//         evmService = module.get(EvmService)
//     })

//     describe("test verifyMessage", () => {
//         it("should verifyMessage on Aptos sucessfully", async () => {
//             const { data: { message }} = await service.requestMessage()
//             const { privateKey, publicKey } = Account.generate()
//             const signature = aptosService.signMessage(message, privateKey.toString())
//             const result = await service.verifyMessage({ message, signature, publicKey: publicKey.toString(), chain: Chain.Aptos })
//             expect(result.data.result).toBe(true)
//         })
//         it("should verifyMessage on Avalanche sucessfully", async () => {
//             const { data: { message }} = await service.requestMessage()
//             const { privateKey, address } = Wallet.createRandom()
//             const signature = evmService.signMessage(message, privateKey)
//             const result = await service.verifyMessage({ message, signature, publicKey: address, chain: Chain.Avalanche })
//             expect(result.data.result).toBe(true)
//         })
//         it("should verifyMessage on Aptos failed wrong signature", async () => {
//             const { data: { message }} = await service.requestMessage()
//             const { privateKey, publicKey } = Account.generate()
//             const signature = aptosService.signMessage(message, privateKey.toString())
//             const result = await service.verifyMessage({ message, signature: `${signature}x` , publicKey: publicKey.toString(), chain: Chain.Aptos })
//             expect(result.data.result).toBe(false)
//         })
//         it("should verifyMessage on Avalanche failed wrong signature", async () => {
//             const { data: { message }} = await service.requestMessage()
//             const { privateKey, publicKey } = Account.generate()
//             const signature = evmService.signMessage(message, privateKey.toString())
//             const result = await service.verifyMessage({ message, signature: `${signature}x`, publicKey: publicKey.toString(), chain: Chain.Avalanche })
//             expect(result.data.result).toBe(false)
//         })
//         it("should verifyMessage on Aptos failed wrong message", async () => {
//             const message = "starci"
//             const { privateKey, publicKey } = Account.generate()
//             const signature = evmService.signMessage(message, privateKey.toString())
//             await expect(async () => {
//                 await service.verifyMessage({
//                     message,
//                     signature,
//                     publicKey: publicKey.toString(),
//                     chain: Chain.Aptos
//                 })
//             }).rejects.toThrow()
//         })
//         it("should verifyMessage on Aptos success after 59s", async () => {
//             jest.useFakeTimers()
//             const { data: { message }} = await service.requestMessage()
//             await jest.advanceTimersByTimeAsync(1000 * 14)
//             const { privateKey, address } = Wallet.createRandom()
//             const signature = evmService.signMessage(message, privateKey)
//             const result = await service.verifyMessage({ message, signature, publicKey: address, chain: Chain.Avalanche })
//             expect(result.data.result).toBe(true)
//             jest.useRealTimers()
//         })
//         it("should verifyMessage on Aptos failed timed out message", async () => {
//             jest.useFakeTimers()
//             const { data: { message }} = await service.requestMessage()
//             await jest.advanceTimersByTimeAsync(1000 * 20)
//             const { privateKey, publicKey } = Account.generate()
//             const signature = evmService.signMessage(message, privateKey.toString())
//             await service.verifyMessage({
//                 message,
//                 signature,
//                 publicKey: publicKey.toString(),
//                 chain: Chain.Aptos
//             })
//             jest.useRealTimers()
//         })
//     })
// })
  