import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "../entities";
import { UserDto, UserUpdateDto } from "../dtos";
import { RoleService } from "./role.service";
import { StateEnum } from "../../../shared/enums";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepo:Repository<User>,
    private _roleService: RoleService
  ) {
  }

  async getMany() {
    return await this._userRepo.find();
  }

  async getOne(id: number): Promise<User> {
    if (!id) throw new BadRequestException('id must be sent');

    const user = await this._userRepo.findOne({
      where: {
        id: id,
        state: StateEnum.ACTIVE
      }
    });
    if (!user) throw new NotFoundException(`User con id: ${id} not exist!`);

    return user;
  }

  async createOne(dto: UserDto): Promise<User> {
    const existUser = await this._userRepo.findOneBy({username: dto.username});
    if (existUser) throw new BadRequestException(`The user alredy exist.`);
    const newUser = await this._userRepo.create(dto);
    const role = await this._roleService.getOne(dto.rolesIds[0]);
    newUser.roles = [role];
    const user = await this._userRepo.save(newUser);
    delete user.password;
    return user;
  }

  async updateOne(id: number, dto: UserUpdateDto): Promise<User> {
    const user = await this.getOne(id);
    this._userRepo.merge(user, dto);
    if (dto.rolesIds) {
      const role = await this._roleService.getOne(dto.rolesIds[0]);
      user.roles = [role];
    }
    return await this._userRepo.save(user);
  }

  async deleteOne(id: number) {
    const user = await this.getOne(id);
    return await this._userRepo.remove(user);
  }

  async getOneWithUsername(username: string) {
    return await this._userRepo.findOne({
      where: { username },
      relations: { roles:true }
    });
  }
}
