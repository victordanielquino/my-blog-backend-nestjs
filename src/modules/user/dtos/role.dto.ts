import {
  IsString,
  IsNotEmpty,
  Length, IsEnum, IsArray
} from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

import { EnumToString } from "../../../helpers/enumToString";
import { RoleEnum, StateEnum } from "../../../shared/enums";

export class RoleDto {
  //@IsEnum(RoleEnum, {message: `Option state invalid, se esperaba: ${EnumToString(RoleEnum)}`, each: true})
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'name del rol' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly description: string;

  @IsEnum(StateEnum, {message: `Option state invalid, se esperaba: ${EnumToString(StateEnum)}`, each: true})
  @IsNotEmpty()
  @ApiProperty()
  readonly state: StateEnum;

  @IsArray()
  @ApiProperty()
  readonly usersIds: number[]
}

export class RolUpdateDto extends PartialType(RoleDto) {}
