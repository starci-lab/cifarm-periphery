import { HttpResponse } from "@/utils"
import { VerifyMessageRequestBody } from "./verify-message.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsOptional } from "class-validator"

export class GetFakeSignatureRequestBody {
  @IsOptional()
  @ApiProperty({ example: "avalanche" })
      chainKey?: string
  @IsOptional()
  @ApiProperty({ example: 0 })
      accountNumber?: number
}

export class GetFakeSignatureResponseData extends VerifyMessageRequestBody {
  @IsOptional()
  @ApiProperty({ example: "avalanche" })
      chainKey?: string
}
 
export const GET_FAKE_SIGNATURE_RESPONSE_SUCCESS_MESSAGE = "Successfully retrieved fake signature"
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
      },
  })
      data: GetFakeSignatureResponseData
}