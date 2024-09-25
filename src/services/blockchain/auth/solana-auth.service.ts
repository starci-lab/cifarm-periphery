import { SignedMessage } from "../common"
import { Injectable, Logger } from "@nestjs/common"
import nacl from "tweetnacl"
import { decodeUTF8 } from "tweetnacl-util"

@Injectable()
export class SolanaAuthService {
    private readonly logger = new Logger(SolanaAuthService.name)
    constructor() {}

    public verifyMessage({
        message,
        signature,
        publicKey,
    }: Omit<SignedMessage, "chainName">) {
        console.log(message, signature, publicKey)
        try {
            return nacl.sign.detached.verify(
                decodeUTF8(message),
                Buffer.from(signature, "hex"),
                Buffer.from(publicKey, "hex"),
            )
        } catch (ex) {
            this.logger.error(ex)
            return false
        }
    }

    public signMessage(message: string, privateKey: string) {
        return Buffer.from(
            nacl.sign.detached(
                decodeUTF8(message),
                decodeUTF8(privateKey),
            ),
        ).toString("base64")
    }
}
