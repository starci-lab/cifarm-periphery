import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { HttpResponse, TransactionHttpResponseData } from "@/utils"
import { Network } from "@/config"

//since current testnet, we temporarily offer free tier for creating near account
export class CreateNearAccountRequestBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "tucuong183" })
      subdomain: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "ed25519:23b3"})
        publicKey: string
        
  @IsOptional()
  @ApiProperty({ example: "testnet" })
      network?: Network
}

export class CreateNearAccountResponseData implements TransactionHttpResponseData {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
      example:
      "0x1f458783251909793d4d07a4e81e7fe4922499eafdc4c298d9312190550b4608",
  })
      transactionHash: string
}

export const CREATE_NEAR_ACCOUNT_RESPONSE_SUCCESS_MESSAGE = "Create near account succesfully"
export class CreateNearAccountResponse
implements HttpResponse<CreateNearAccountResponseData>
{
  @ApiProperty({ example: CREATE_NEAR_ACCOUNT_RESPONSE_SUCCESS_MESSAGE })
      message: string

  @ApiProperty({
      example: {
          transactionHash: "0x1f458783251909793d4d07a4e81e7fe4922499eafdc4c298d9312190550b4608",
      },
  })
      data: CreateNearAccountResponseData
}
