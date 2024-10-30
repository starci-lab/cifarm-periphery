import { HttpResponse } from "@/utils"
import { SignedMessage } from "../../../blockchain"
import { ApiProperty } from "@nestjs/swagger"
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator"
import { Network } from "@/config"

export class VerifyMessageRequestBody implements SignedMessage {
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
  @IsOptional()
  @ApiProperty({ example: "avalanche" })
      chainKey?: string
  @IsOptional()
  @ApiProperty({ example: "testnet" })
      network?: Network
}

export class VerifyMessageResponseData {
  @IsBoolean()
  @ApiProperty({ example: true })
      result: boolean
      
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
      example: "65a9c6f6e5a9e79b7f2b9b7e5b2e5e5b78767f764e6d5dfe1189e4b015b7e057",
  })
      authenticationId: string
}

export const VERIFY_MESSAGE_RESPONSE_SUCCESS_MESSAGE =
  "Message verification successful"
export const VERIFY_MESSAGE_RESPONSE_FAILED_MESSAGE =
  "Message verification failed"

export class VerifyMessageResponse
implements HttpResponse<VerifyMessageResponseData>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: VERIFY_MESSAGE_RESPONSE_SUCCESS_MESSAGE })
      message: string
  @ApiProperty({
      example: {
          result: true,
          address: "0x6fc0C3f7B9Ec501A547185074F7299d34cd73209",
      },
  })
      data: VerifyMessageResponseData
}
