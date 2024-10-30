import { HttpResponse } from "@/utils"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"
import { Network } from "@/config"
import { BotType } from "@/guards"

export class GetFakeSignatureRequestBody {
  @IsOptional()
  @ApiProperty({ example: "avalanche" })
      chainKey?: string
  @IsOptional()
  @ApiProperty({ example: 0 })
      accountNumber?: number

  @IsOptional()
  @ApiProperty({ example: Network.Testnet })
      network?: Network
}

export class GetFakeSignatureResponseData {
  @IsOptional()
  @ApiProperty({ example: "avalanche" })
      chainKey: string

  @IsNotEmpty()
  @ApiProperty({ example: "hello world" })
      message: string

  @ApiProperty({ example: "0xD9a49b9c8df1b8Be5Ef7770EE328650B0Bcf6345" })
      publicKey: string

  @ApiProperty({
      example:
      "0x62cc52b62e31d82925e36747ed8229b583d34f2dce52dee3dcc4664c25c58cfa13f8cc15ed0bfb834646069d649ade99d12b3a67fa6a469a27b77baeaffd8b991b",
  })
      signature: string

  @ApiProperty({ example: "testnet" })
      network: Network

  @ApiProperty({ example: "tranminhthien" })
      telegramInitDataRaw: string

  @ApiProperty({ example: BotType.Ciwallet })
      botType: BotType
  @ApiProperty({ example: "0xc0ffee" })
      accountAddress: string
}

export const GET_FAKE_SIGNATURE_RESPONSE_SUCCESS_MESSAGE =
  "Successfully retrieved fake signature"
export class GetFakeSignatureResponse
implements HttpResponse<GetFakeSignatureResponseData>
{
  @ApiProperty({ example: GET_FAKE_SIGNATURE_RESPONSE_SUCCESS_MESSAGE })
      message: string
  @ApiProperty({
      example: {
          message: "cdea7a39-87c0-4897-9603-2e3803bab2b2",
          publicKey:
        "0x029e224bb275d9cb029ad259a56c0e8b94f5539293390e687f15a8f893af10c259",
          signature:
        "0x6fa96ff396624f171d34ca5eea82a87b2ab40df237b7bae7335da700fb0730ac7f5047e13a78cc3b1cda2341bc34278603b90b8a793834fd8f2f2fbc8205820e1c",
          chainKey: "avalanche",
          network: "testnet",
          telegramInitData: "tranminhthien",
          botType: BotType.Ciwallet
      },
  })
      data: GetFakeSignatureResponseData
}
