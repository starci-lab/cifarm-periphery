import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsUUID } from "class-validator"
import { HttpResponse } from "@/utils"
import { Network } from "@/config"

export class MintRequestBody {
    @ApiProperty({ example: "0xA9E72Ae9FfEc2a10AA9b6d617d1faf4953A2dADD" })
        tokenAddress: string
    @ApiProperty({ example: "0xA9E72Ae9FfEc2a10AA9b6d617d1faf4953A2dADD" })
        toAddress: string
    @ApiProperty({ example: "7b2257c3e94db9f32bb7faf4006b765dc6c807ac9170b4541563883d74781670" })
        minterPrivateKey: string
    @ApiProperty({ example: 5 })
        mintAmount: number
    @IsOptional()
    @ApiProperty({ example: "avalanche" })
        chainKey?: string
    @IsOptional()
    @ApiProperty({ example: "testnet" })
        network?: Network
}

export class MintResponseData {
    @IsUUID(4)
    @ApiProperty({ example: "0x1f458783251909793d4d07a4e81e7fe4922499eafdc4c298d9312190550b4608" })
        transactionHash: string
}

export const MINT_RESPONSE_SUCCESS_MESSAGE="Mint succesfully"
export class MintResponse implements HttpResponse<MintResponseData> {
    @ApiProperty({ example: MINT_RESPONSE_SUCCESS_MESSAGE })
        message: string
    @ApiProperty({
        example: {
            message: "550e8400-e29b-41d4-a716-446655440000",
        },
    })
        data: MintResponseData
}