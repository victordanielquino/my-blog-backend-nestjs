import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

import { EnumToString } from "../../../helpers/enumToString";
import { CategoryEnum } from "../../../shared/enums";

export class PostCreateDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  /*@IsEnum(CategoryEnum, {message: `Category invalid ${EnumToString(CategoryEnum)} `, each: true})
  @ApiProperty()
  category: CategoryEnum[];*/

  /*@IsArray()
  @IsString({each:true})
  @ApiProperty()
  tags: string[];*/

  /*@IsBoolean()
  @ApiProperty()
  status: boolean;*/
}

export class PostUpdateDto extends PartialType(PostCreateDto){};