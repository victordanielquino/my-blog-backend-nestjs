import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolService } from "../services/rol.service";
import { RolCreateDto } from "../dtos/rol-create.dto";
import { RolUpdateDto } from "../dtos/rol-update.dto";

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

  @Get()
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._rolService.getOne(id);
  }

  @Post()
  createOne(@Body() dto: RolCreateDto) {
    console.log(dto);
    return this._rolService.createOne(dto);
  }

  @Put()
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: RolUpdateDto) {
    return this._rolService.updateOne(id, dto);
  }

  @Delete()
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this._rolService.deleteOne(id);
  }
}
