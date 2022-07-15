import {
  IsString,
  IsNotEmpty,
  Length, IsEnum
} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

import { EnumToString } from "../../../helpers/enumToString";
import { StateEnum } from "../../../shared/enums";

export class RolCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'abreviacion del rol' })
  initial: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  description: string;

  @IsEnum(StateEnum, {message: `Option state invalid, se esperaba: ${EnumToString(StateEnum)}`})
  @IsNotEmpty()
  @ApiProperty()
  state: StateEnum;
}
