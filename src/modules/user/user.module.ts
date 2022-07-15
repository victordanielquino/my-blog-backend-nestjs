import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User, Rol } from "./entities";
import { RolService } from './services/rol.service';
import { RolController } from './controllers/rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, User])],
  controllers: [UserController, RolController],
  providers: [UserService, RolService],
  exports: [UserService, RolService]
})
export class UserModule {}
