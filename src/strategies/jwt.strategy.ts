import { envConfig } from "@/config"
import { AccountEntity } from "@/database"
import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envConfig().secrets.jwt.secret,
        })
    }

    async validate(payload: AccountEntity): Promise<AccountEntity> {
        return payload
    }
}