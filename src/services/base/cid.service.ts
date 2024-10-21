import { Injectable, Logger } from "@nestjs/common"
import { decodeAddress, encodeAddress } from "algosdk"
import { CID } from "multiformats/cid"
import { sha256 } from "multiformats/hashes/sha2"
import { digest } from "multiformats"
import axios from "axios"

@Injectable()
export class CIDService {
    private readonly logger = new Logger(CIDService.name)
    
    constructor() {}

    //algorand only
    public algorandCidToReserve(cid: string) {
        const decoded = CID.parse(cid)
        const { version } = decoded
        
        const url = `template-ipfs://{ipfscid:${version}:dag-pb:reserve:sha2-256}`
        const reserveAddress = encodeAddress(
            Uint8Array.from(Buffer.from(decoded.multihash.digest))
        )
        return {
            url,
            reserveAddress,
        }
    }

    public algorandReserveAddressToCid(reserveAddress: string) {
        const { publicKey } = decodeAddress(reserveAddress)
        const mhdigest = digest.create(sha256.code, publicKey)
        return CID.createV0(mhdigest).toString()
    }

    public getCidUrl(cid: string) {
        return  `https://violet-lazy-yak-333.mypinata.cloud/ipfs/${cid}`
    }

    async getCidContent(cid: string) {
        try {
            const url = this.getCidUrl(cid)
            const { data } = await axios.get(url)
            return data
        } catch (ex) {
            this.logger.error(ex)
            return null
        }
    }
}