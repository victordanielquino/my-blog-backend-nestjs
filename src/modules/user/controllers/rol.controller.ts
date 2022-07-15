import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { RolService } from "../services/rol.service";
import { RolDto } from "../dtos";
import { RolUpdateDto } from "../dtos";

@ApiTags('rols')
@Controller('rol')
export class RolController {
  constructor(private _rolService: RolService) {
  }

  @Get()
  @ApiOperation({})
  getMany() {
    return this._rolService.getMany();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._rolService.getOne(id);
  }

  @Get(':id/users')
  getOneWithUsers(@Param('id', ParseIntPipe) id: number) {
    return this._rolService.getOneWithUsers(id);
  }

  @Post()
  createOne(@Body() dto: RolDto) {
    return this._rolService.createOne(dto);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: RolUpdateDto) {
    return this._rolService.updateOne(id, dto);
  }

  @Delete()
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this._rolService.deleteOne(id);
  }
}
