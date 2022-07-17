import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "@nestjs/config";

import config from "../../../common/config/config";
import { PayloadTokenDto } from "../dtos";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // desde donde vamos a recoger el tocken: header
      ignoreExpiration: false, // necesitamos saber si el tocken vencio o no
      secretOrKey: configService.jwtSecret, // inyectamos la key-secret
    });
  }

  validate(payload: PayloadTokenDto) {
    return payload;
  }
}