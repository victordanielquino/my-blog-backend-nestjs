import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";

import { PassportModule } from "@nestjs/passport";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy, LocalStrategy } from "./strategies";
import { UserModule } from "../../modules/user/user.module";
import config from "../../common/config/config";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    UserModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '60m',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
