import {
  IsString,
  IsNotEmpty,
  Length, IsEnum
} from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

import { EnumToString } from "../../../helpers/enumToString";
import { StateEnum } from "../../../shared/enums";

export class RolDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'abreviacion del rol' })
  readonly initial: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly description: string;

  @IsEnum(StateEnum, {message: `Option state invalid, se esperaba: ${EnumToString(StateEnum)}`, each: true})
  @IsNotEmpty()
  @ApiProperty()
  readonly state: StateEnum[];
}

export class RolUpdateDto extends PartialType(RolDto) {}
