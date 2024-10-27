import { HttpResponse } from "@/utils"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class SignInRequestBody {
  @ApiProperty({ example: "starci" })
      username: string
  @ApiProperty({ example: "Cuong123_A" })
      password: string
}

export class SignInResponseData {
    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWYzZjQ"})
        jwtToken: string
}  

export const SIGN_IN_RESPONSE_SUCCESS_MESSAGE = "Successfully signed in"

export const SIGN_IN_RESPONSE_DATA = "Successfully signed in"
export class SignInResponse
implements HttpResponse<SignInResponseData>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: SIGN_IN_RESPONSE_SUCCESS_MESSAGE })
      message: string
  @ApiProperty({
      example: {
          jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWYzZjQ"
      },
  })
      data: SignInResponseData
}