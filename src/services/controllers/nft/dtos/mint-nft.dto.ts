import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { HttpResponse, TransactionHttpResponseData } from "@/utils"
import { defaultNftCollectionKey, Network, SupportedChainKey } from "@/config"

export class MintNftRequestBody {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: "69" })
      tokenId?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ example: defaultNftCollectionKey })
      nftCollectionKey?: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "starci123.testnet" })
      toAddress: string

  @IsOptional()
  @ApiProperty({
      example: "https://ipfs.io/ipfs/QmQZ4e1qk8v5Y2Z2h3pX3W7Q9v2VYQ2X9wF2x2B3q2",
  })
      imageUrl?: string

  //serialized properties
  @IsOptional()
  @ApiProperty({ example: "\"{\"hello\":\"world\"}\"" })
      properties?: string

  @IsOptional()
  @ApiProperty({ example: SupportedChainKey.Near })
      chainKey?: SupportedChainKey

  @IsOptional()
  @ApiProperty({ example: "testnet" })
      network?: Network
}

export class MintNftResponseData implements TransactionHttpResponseData {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
      example:
      "0x1f458783251909793d4d07a4e81e7fe4922499eafdc4c298d9312190550b4608",
  })
      transactionHash: string
  //return the nft token id, whether intialized by blockchain or inputed from request
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "69" })
      tokenId: string
}

export const MINT_NFT_RESPONSE_SUCCESS_MESSAGE = "Mint nft succesfully"
export class MintNftResponse
implements HttpResponse<MintNftResponseData>
{
  @ApiProperty({ example: MINT_NFT_RESPONSE_SUCCESS_MESSAGE })
      message: string

  @ApiProperty({
      example: {
          tokenId: "69",
      },
  })
      data: MintNftResponseData
}
