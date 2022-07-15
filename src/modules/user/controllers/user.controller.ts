import { Controller, Get, Post, Put, Delete, ParseIntPipe, Param, Body } from "@nestjs/common";

import { UserService } from "../services/user.service";
import { UserDto, UserUpdateDto } from "../dtos";

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

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe)id: number) {
    const data = await this._userService.getOne(id);
    return {
      message: 'ok',
      data
    }
  }

  @Post()
  async createOne(@Body() dto: UserDto) {
    const data = await this._userService.createOne(dto);
    return {
      message: 'ok',
      data
    }
  }

  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UserUpdateDto) {
    const data = await this._userService.updateOne(id, dto);
    return {
      message: 'User edit',
      data
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const data = this._userService.deleteOne(id);
    return {
      message: 'ok',
      data
    }
  }
}
