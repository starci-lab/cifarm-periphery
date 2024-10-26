import { HttpResponse } from "@/utils"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class DeleteAccountRequestBody {
    @IsUUID("4")
  @ApiProperty({ example: "cf207412-86ea-45b3-87ef-71f6d7764ca4" })
        id: string
}

export const DELETE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE =
  "Account deleted successfully"
export class DeleteAccountResponse implements HttpResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: DELETE_ACCOUNT_RESPONSE_SUCCESS_MESSAGE })
      message: string
}
