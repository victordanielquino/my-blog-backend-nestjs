import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from "./entities/user.entity";
import { Rol } from "./entities/rol.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Rol, User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
