import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";

import { User } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto, UserUpdateDto } from "../dtos";
import { RolService } from "./rol.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepo:Repository<User>,
    private _rolService: RolService
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

  async createOne(dto: UserDto) {
    const existUser = await this._userRepo.findOneBy({username: dto.username});
    if (existUser) throw new BadRequestException(`The user alredy exist.`);
    const newUser = await this._userRepo.create(dto);
    const rol = await this._rolService.getOne(dto.rolId);
    newUser.rol = rol;
    const user = await this._userRepo.save(newUser);
    delete user.password;
    return user;
  }

  async updateOne(id: number, dto: UserUpdateDto) {
    const user = await this.getOne(id);
    this._userRepo.merge(user, dto);
    if (dto.rolId) {
      const rol = await this._rolService.getOne(dto.rolId);
      user.rol = rol;
    }
    return this._userRepo.save(user);
  }

  async deleteOne(id: number) {
    const user = await this.getOne(id);
    return await this._userRepo.remove(user);
  }

  async getOneWithUsername(username: string) {
    return await this._userRepo.findOne({
      where: { username },
      relations: { rol:true }
    });
  }
}
