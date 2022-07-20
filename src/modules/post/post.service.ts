import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectRolesBuilder, RolesBuilder } from "nest-access-control";

import { Post } from "./post.entity";
import { PostCreateDto, PostUpdateDto } from "./dtos";
import { PayloadTokenDto } from "../../core/auth/dtos";
import { AppResourcesEnum } from "../../shared/enums";
import { UserService } from "../user/services/user.service";

@Injectable()
export class PostService {

  constructor(
    private _userService: UserService,
    @InjectRepository(Post) private readonly _postRepo: Repository<Post>,
    @InjectRolesBuilder() private readonly _rolesBuilder: RolesBuilder
  ) {
  }

  async getMany(): Promise<Post[]> {
    return await this._postRepo.find({
      relations: {user: true}
    });
  }

  async getOne(id: number, idToken?: number): Promise<Post> {
    const post = await this._postRepo.findOne({
      where: { id },
      relations: { user: true }
    })
      .then(item => !idToken ? item: !!item && item.user.id === idToken ? item: null);
    if (!post) throw new NotFoundException(`Post with id: ${id} not exits or unauthorized.`)
    return post;
  }

  async createOne(dto: PostCreateDto, user: PayloadTokenDto): Promise<Post> {
    if (!dto.userId && !user.id) throw new BadRequestException('id must be sent');
    if (dto.userId != user.id) throw new BadRequestException('id must be sent');

    const userPost = await this._userService.getOne(dto.userId);
    if (!userPost) throw new NotFoundException(`User with id: ${dto.userId} not exist`)
    const postNew = await this._postRepo.create(dto);
    postNew.user = userPost;
    return await this._postRepo.save(postNew);
  }

  async updateOne(id: number, dto: PostUpdateDto, token: PayloadTokenDto) {
    let post;
    if (this._rolesBuilder.can(token.roles).updateAny(AppResourcesEnum.POST).granted) {
      const user = await this._userService.getOne(dto.userId);
      post = await this.getOne(id);
      post.user = user;
      this._postRepo.merge(post, dto);
    }
    else {
      post = await this.getOne(id, token.id);
      const {userId, ...dtoNew} = dto;
      this._postRepo.merge(post, dtoNew);
    }
    return await this._postRepo.save(post);
  }

  async deleteOne(id: number, token: PayloadTokenDto) {
    let post;
    if (this._rolesBuilder.can(token.roles).updateAny(AppResourcesEnum.POST).granted) {
      post = await this.getOne(id);
    } else {
      post = await this.getOne(id, token.id);
    }
    return await this._postRepo.remove(post);
  }
}
