import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { RoleService } from "../services/role.service";
import { RoleDto } from "../dtos";
import { RolUpdateDto } from "../dtos";
import { AuthDecorator } from "../../../core/auth/decorators";
import { AppResouces } from "../../../app.roles";

@ApiTags('Controller: Roles')
@Controller('rol')
export class RoleController {
  constructor(private _rolService: RoleService) {
  }

  @Get()
  @ApiOperation({})
  async getMany() {
    const data = await this._rolService.getMany();
    return {
      message: 'getMany post ok',
      data
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this._rolService.getOne(id);
    return {
      message: 'getOne post ok',
      data
    }
  }

  @Get(':id/users')
  async getOneWithUsers(@Param('id', ParseIntPipe) id: number) {
    const data = await this._rolService.getOneWithUsers(id);
    return {
      message: 'getOne post with users ok',
      data
    }
  }

  @Post()
  async createOne(@Body() dto: RoleDto) {
    const data = await this._rolService.createOne(dto);
    return {
      message: 'create post ok',
      data
    }
  }

  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: RolUpdateDto) {
    const data = await this._rolService.updateOne(id, dto);
    return {
      message: 'updateOne post ok',
      data
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const resp = await this._rolService.deleteOne(id);
    return {
      message: 'deleteOne rol ok',
      resp
    }
  }
}
