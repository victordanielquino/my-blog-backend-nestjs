import { Controller, Get, Post, Put, Delete, ParseIntPipe, Param, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserService } from "../services/user.service";
import { UserDto, UserUpdateDto } from "../dtos";
import { AuthDecorator } from "../../../core/auth/decorators";
import { AppResouces } from "../../../app.roles";

@ApiTags('Controller: Users')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  async getMany() {
    const data = await this._userService.getMany();
    return {
      message: 'ok',
      data
    }
  }

  /*@AuthDecorator({
    possession: 'any',
    action: 'create',
    resource: AppResouces.USER
  })*/
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe)id: number) {
    const data = await this._userService.getOne(id);
    return {
      message: 'ok',
      data
    }
  }

  @AuthDecorator({
    possession: 'any',
    action: 'create',
    resource: AppResouces.USER
  })
  @Post()
  async createOne(@Body() dto: UserDto) {
    const data = await this._userService.createOne(dto);
    return {
      message: 'ok',
      data
    }
  }

  @AuthDecorator({
    possession: 'any',
    action: 'create',
    resource: AppResouces.USER
  })
  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UserUpdateDto) {
    const data = await this._userService.updateOne(id, dto);
    return {
      message: 'User edit',
      data
    }
  }

  @AuthDecorator({
    possession: 'any',
    action: 'create',
    resource: AppResouces.USER
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
