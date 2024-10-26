import { Role } from "@/database"
import { HttpResponse } from "@/utils"
import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class UpdateAccountRequestBody {
  @IsUUID("4")
  @ApiProperty({ example: "cf207412-86ea-45b3-87ef-71f6d7764ca4" })
      id: string

  @Optional()
  @ApiProperty({ example: "starci", nullable: true })
      username?: string

  @Optional()
  @ApiProperty({ example: "Cuong123_A", nullable: true })
      password?: string

  @Optional()
  @ApiProperty({ example: [Role.GameManager, Role.NftBurner], nullable: true })
      roles?: Array<Role>
}

export const UPDATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE =
  "Account updated successfully"
export class UpdateAccountResponse implements HttpResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: UPDATE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE })
      message: string
}
