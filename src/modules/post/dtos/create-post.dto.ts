import { IsArray, IsBoolean, IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

//import { EnumToString } from "../../../helpers/enumToString";
import { CategoryEnum } from "../../../shared/enums";

export class CreatePostDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  slug: string;

  @IsString()
  @ApiProperty()
  excerpt: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsEnum(CategoryEnum, {message: `Category invalid `})
  @ApiProperty()
  category: CategoryEnum;

  @IsArray()
  @IsString({each:true})
  @ApiProperty()
  tags: string[];

  @IsBoolean()
  @ApiProperty()
  status: boolean;
}