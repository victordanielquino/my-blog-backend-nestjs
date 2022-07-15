import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  Length,
  IsEnum, IsBoolean
} from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

import { EnumToString } from "../../../helpers/enumToString";
import { StateEnum } from "../../../shared/enums";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the username of user' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly enabled: boolean;

  /*@IsEnum(StateEnum, {message: `Opcion invalida. Se esperaba: ${EnumToString(StateEnum)}`, each:true})
  @IsNotEmpty()
  @ApiProperty()
  readonly state: StateEnum[];*/

  @IsEnum(StateEnum, {message: `Opcion invalida. Se esperaba: ${EnumToString(StateEnum)}`, each: true})
  @IsNotEmpty()
  @ApiProperty()
  readonly state: StateEnum[];

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly rolId: number;
}

export class UserUpdateDto extends PartialType(UserDto) {}
