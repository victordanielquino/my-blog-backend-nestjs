import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { RoleService } from "../services/role.service";
import { RoleDto } from "../dtos";
import { RolUpdateDto } from "../dtos";
import { AuthDecorator } from "../../../core/auth/decorators";
import { AppResourcesEnum } from "../../../shared/enums";

@ApiTags('Controller: Roles')
@Controller('rol')
export class RoleController {
  constructor(private _rolService: RoleService) {
  }

  @AuthDecorator({
    possession: 'any',
    action: 'read',
    resource: AppResourcesEnum.ROLE
  })
  @Get()
  @ApiOperation({})
  async getMany() {
    const data = await this._rolService.getMany();
    return {
      message: 'getMany rol ok',
      data
    }
  }

  @AuthDecorator({
    possession: 'any',
    action: 'read',
    resource: AppResourcesEnum.ROLE
  })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this._rolService.getOne(id);
    return {
      message: 'getOne rol ok',
      data
    }
  }

  @AuthDecorator({
    possession: 'any',
    action: 'read',
    resource: AppResourcesEnum.ROLE
  })
  @Get(':id/users')
  async getOneWithUsers(@Param('id', ParseIntPipe) id: number) {
    const data = await this._rolService.getOneWithUsers(id);
    return {
      message: 'getOne rol with users ok',
      data
    }
  }

  @AuthDecorator({
    possession: 'any',
    action: 'create',
    resource: AppResourcesEnum.ROLE
  })
  @Post()
  async createOne(@Body() dto: RoleDto) {
    const data = await this._rolService.createOne(dto);
    return {
      message: 'create rol ok',
      data
    }
  }

  @AuthDecorator({
    possession: 'any',
    action: 'update',
    resource: AppResourcesEnum.ROLE
  })
  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: RolUpdateDto) {
    const data = await this._rolService.updateOne(id, dto);
    return {
      message: 'updateOne rol ok',
      data
    }
  }

  @AuthDecorator({
    possession: 'any',
    action: 'delete',
    resource: AppResourcesEnum.ROLE
  })
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const resp = await this._rolService.deleteOne(id);
    return {
      message: 'deleteOne rol ok',
      resp
    }
  }
}
