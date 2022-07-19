import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User, Role } from "./entities";
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService]
})
export class UserModule {}
