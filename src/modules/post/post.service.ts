import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from "./dtos/update-post.dto";
import { CreatePostDto } from "./dtos";

@Injectable()
export class PostService {

  constructor() {
  }

  getMany() {
    return {ok: 'getMany'}
  }

  getOne(id: number) {
    return {ok: 'getOne'}
  }

  updateOne(id: number, dto: UpdatePostDto) {
    return {ok: 'updateOne'}
  }

  createOne(dto: CreatePostDto) {
    return {ok: 'createOne'}
  }

  deleteOne(id: number) {
    return {ok: 'deleteOne'}
  }
}
