import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { PostCreateDto, PostUpdateDto } from "./dtos";
import { PostService } from "./post.service";
import { AuthDecorator } from "../../core/auth/decorators";
import { AppResourcesEnum } from "../../shared/enums";
import { UserDecorator } from "../../common/decorators";
import { PayloadTokenDto } from "../../core/auth/dtos";

@ApiTags('Controller: Posts')
@Controller('post')
export class PostController {

  constructor(
    private _postService: PostService
  ) {
  }

  @Get()
  async getMany() {
    const data = await this._postService.getMany()
    return {
      message: 'Get All posts ok',
      data
    };
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this._postService.getOne(id);
    return {
      message: 'Get one post ok',
      data
    }
  }

  @Post()
  @AuthDecorator({
    possession: 'own',
    action: 'create',
    resource: AppResourcesEnum.POST
  })
  async createOne(
    @Body() dto: PostCreateDto,
    @UserDecorator() user: PayloadTokenDto
  ) {
    const data = await this._postService.createOne(dto, user);
    return {
      message: 'Create post ok',
      data
    };
  }

  @Put(':id')
  @AuthDecorator({
    possession: 'own',
    action: 'update',
    resource: AppResourcesEnum.POST
  })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PostUpdateDto,
    @UserDecorator() token: PayloadTokenDto
  ) {
    const data = await this._postService.updateOne(id, dto, token);
    return {
      message: 'Update post ok',
      data
    };
  }

  @Delete(':id')
  @AuthDecorator({
    possession: 'own',
    action: 'delete',
    resource: AppResourcesEnum.POST
  })
  async deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @UserDecorator() token: PayloadTokenDto
  ) {
    const data = await this._postService.deleteOne(id, token);
    return {
      message: 'DeleteOne post ok',
      data
    };
  }
}
