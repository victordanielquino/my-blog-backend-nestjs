import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";

import { User } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDto } from "../dtos";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepo:Repository<User>
  ) {
  }

  async getMany() {
    return await this._userRepo.find();
  }

  async getOne(id: number) {
    const user = await this._userRepo.findOne({
      where: {
        id: id
      },
      relations: {
        rol: true
      }
    });
    if (!user) throw new NotFoundException(`User con id: ${id} not exist!`)
    return user;
  }

  async createOne(dto: UserCreateDto) {
    // const newUser = this._userRepo.create(dto);
  }

  updateOne() {}

  deleteOne() {}
}
