import { Controller, Get, Post, Put, Delete, ParseIntPipe, Param, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRolesBuilder, RolesBuilder } from "nest-access-control";

import { UserService } from "../services/user.service";
import { UserDto, UserUpdateDto } from "../dtos";
import { AuthDecorator } from "../../../core/auth/decorators";
import { UserDecorator } from "../../../common/decorators";
import { PayloadTokenDto } from "../../../core/auth/dtos";
import { AppResourcesEnum } from "../../../shared/enums";

@ApiTags('Controller: Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly _userService: UserService,
    @InjectRolesBuilder() private readonly _rolesBuilder: RolesBuilder
  ) {}

  @Get()
  @AuthDecorator({
    possession: 'any',
    action: 'read',
    resource: AppResourcesEnum.USER
  })
  async getMany() {
    const data = await this._userService.getMany();
    return {
      message: 'ok',
      data
    }
  }

  @Get(':id')
  @AuthDecorator({
    possession: 'own',
    action: 'read',
    resource: AppResourcesEnum.USER
  })
  async getOne(
    @Param('id', ParseIntPipe)id: number,
    @UserDecorator() user: PayloadTokenDto
  ) {
    let data;
    if (this._rolesBuilder.can(user.roles).readAny(AppResourcesEnum.USER).granted) {
      // esto es un admin:
      data = await this._userService.getOne(id);
    } else {
      // esto es un author:
      data = await this._userService.getOne(id, user.id);
    }
    return {
      message: 'getOne user ok',
      data
    }
  }

  @Post()
  @AuthDecorator({
    possession: 'any',
    action: 'create',
    resource: AppResourcesEnum.USER
  })
  async createOne(@Body() dto: UserDto) {
    const data = await this._userService.createOne(dto);
    return {
      message: 'create user ok',
      data
    }
  }

  @Put(':id')
  @AuthDecorator({
    possession: 'own',
    action: 'update',
    resource: AppResourcesEnum.USER
  })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDto,
    @UserDecorator() user: PayloadTokenDto
  ) {
    let data;
    if (this._rolesBuilder.can(user.roles).updateAny(AppResourcesEnum.USER).granted) {
      // esto es un admin:
      data = await this._userService.updateOne(id, dto);
    } else {
      // esto es un author:
      const {rolesIds, ...rest} = dto;
      data = await this._userService.updateOne(id, rest, user.id);
    }
    return {
      message: 'User edit',
      data
    }
  }

  @AuthDecorator({
    possession: 'any',
    action: 'delete',
    resource: AppResourcesEnum.USER
  })
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const data = this._userService.deleteOne(id);
    return {
      message: 'ok',
      data
    }
  }
}
