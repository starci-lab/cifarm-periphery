import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"
import { HttpResponse } from "@/utils"

export class RequestMessageResponseData {
    @IsUUID(4)
    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
        message: string
}

export const REQUEST_MESSAGE_RESPONSE_SUCCESS_MESSAGE="Request message has been successfully generated"
export class RequestMessageResponse implements HttpResponse<RequestMessageResponseData> {
    @ApiProperty({ example: REQUEST_MESSAGE_RESPONSE_SUCCESS_MESSAGE })
        message: string
    @ApiProperty({
        example: {
            message: "550e8400-e29b-41d4-a716-446655440000",
        },
    })
        data: RequestMessageResponseData
}