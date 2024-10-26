import { HttpResponse } from "@/utils"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateGameVersionRequestBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "version" })
      version: string
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "starci" })
      name: string
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Cuong123_A" })
      description: string
}
export class CreateGameVersionResponseData {
  @IsUUID("4")
  @ApiProperty({
      example: "cf207412-86ea-45b3-87ef-71f6d7764ca4",
  })
      id: string
}

export const CREATE_GAME_VERSION_SUCCESS_MESSAGE =
  "Game version created successfully"
export class CreateGameVersionResponse
implements HttpResponse<CreateGameVersionResponseData>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: CREATE_GAME_VERSION_SUCCESS_MESSAGE })
      message: string
  @ApiProperty({
      example: {
          id: "cf207412-86ea-45b3-87ef-71f6d7764ca4",
      },
  })
      data?: CreateGameVersionResponseData
}
