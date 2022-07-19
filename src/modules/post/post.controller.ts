import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";

import { CreatePostDto } from "./dtos";
import { UpdatePostDto } from "./dtos";
import { PostService } from "./post.service";
import { AuthDecorator } from "../../core/auth/decorators";
import { AppResouces } from "../../app.roles";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Controller: Posts')
@Controller('post')
export class PostController {

  constructor(private _postService: PostService) {
  }

  @Get()
  getMany() {
    const data = this._postService.getMany()
    return {
      message: 'Get All posts ok',
      data
    };
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    const data = this._postService.getOne(id);
    return {
      message: 'Get one post ok',
      data
    }
  }

  @AuthDecorator({
    possession: 'own',
    action: 'create',
    resource: AppResouces.POST
  })
  @Post()
  createOne(@Body() dto: CreatePostDto) {
    //const data = this._postService.createOne(dto);
    return {
      message: 'Create post ok',
      //data
    };
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    const data = this._postService.updateOne(id, dto);
    return {
      message: 'Update post ok',
      data
    };
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    const data = this._postService.deleteOne(id);
    return {
      message: 'DeleteOne ok',
      data
    };
  }
}
