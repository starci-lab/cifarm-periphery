import { Role } from "@/database"
import { HttpResponse } from "@/utils"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateAccountRequestBody {
  @ApiProperty({ example: "starci" })
      username: string
  @ApiProperty({ example: "Cuong123_A" })
      password: string
  @ApiProperty({ example: [Role.GameManager, Role.NftBurner] })
      roles: Array<Role>
}

export class CreateAccountResponseData {
  @IsUUID("4")
  @ApiProperty({
      example: "cf207412-86ea-45b3-87ef-71f6d7764ca4",
  })
      id: string
}

export const CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE =
  "Account created successfully"
export class CreateAccountResponse
implements HttpResponse<CreateAccountResponseData>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE })
      message: string
  @ApiProperty({
      example: {
          id: "cf207412-86ea-45b3-87ef-71f6d7764ca4",
      },
  })
      data?: CreateAccountResponseData
}
