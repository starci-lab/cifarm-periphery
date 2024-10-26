import { Role } from "@/database"
import { HttpResponse } from "@/utils"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateAccountRequestBody {
  @ApiProperty({ example: "starci" })
      username: string
  @ApiProperty({ example: "Cuong123_A" })
      password: string
  @ApiProperty({ example: [Role.GameManager, Role.NftBurner] })
      roles: Array<Role>
}

export class CreateAccountResponseData {
  @ApiProperty({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWYzZjQ",
  })
      jwtToken: string
}

export const CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE =
  "Account created successfully"
export class CreateAccountResponse implements HttpResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: CREATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE })
      message: string
}
