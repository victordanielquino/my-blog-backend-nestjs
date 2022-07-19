import { Module } from '@nestjs/common';
import * as Joi from "joi";
import { AccessControlModule } from "nest-access-control";
import { ConfigModule } from "@nestjs/config";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { DatabaseModule } from './core/database/database.module';
import { enviroments } from "./common/config/enviroments";
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import config from "./common/config/config";
import { roles } from "./app.roles";

@Module({
  imports: [
    ConfigModule.forRoot(
    {
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true ,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    AccessControlModule.forRoles(roles),
    PostModule,
    DatabaseModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
