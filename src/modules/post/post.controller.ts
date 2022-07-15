import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";

import { CreatePostDto } from "./dtos";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { PostService } from "./post.service";

@Controller('post')
export class PostController {

  constructor(private _postService: PostService) {
  }

  @Get()
  getMany() {
    return this._postService.getMany();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._postService.getOne(id);
  }

  @Post()
  createOne(@Body() dto: CreatePostDto) {
    console.log('dto:', dto);
    return this._postService.createOne(dto);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this._postService.updateOne(id, dto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this._postService.deleteOne(id);
  }
}
