import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Post } from "./post.entity";
import { UpdatePostDto } from "./dtos";
import { CreatePostDto } from "./dtos";

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post) private readonly _postRepo: Repository<Post>) {
  }

  async getMany() {
    return await this._postRepo.find();
  }

  async getOne(id: number) {
    const post = await this._postRepo.findOneBy({ id });
    if (!post) throw new NotFoundException(`Post with id: ${id} not exits.`)
    return post;
  }

  async createOne(dto: CreatePostDto) {
    const postNew = this._postRepo.create(dto);
    return await this._postRepo.save(postNew);
  }

  async updateOne(id: number, dto: UpdatePostDto) {
    const post = await this.getOne(id);
    this._postRepo.merge(post, dto);
    return await this._postRepo.save(post);
  }

  async deleteOne(id: number) {
    const post = await this._postRepo.findOneBy({ id });
    if (!post) throw new NotFoundException(`Post with id: ${id} not exist`);
    return await this._postRepo.remove(post);
  }
}
