import { PostCategoryEnum } from "../enums";
import { IsArray, IsBoolean, IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EnumToString } from "../../../helpers/enumToString";

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

  @IsEnum(PostCategoryEnum, {message: `Opcion invalida. Se esperaba: ${EnumToString(PostCategoryEnum)}`})
  @ApiProperty()
  category: PostCategoryEnum;

  @IsArray()
  @IsString({each:true})
  @ApiProperty()
  tags: string[];

  @IsBoolean()
  @ApiProperty()
  status: boolean;
}