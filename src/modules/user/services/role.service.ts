import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Role } from "../entities";
import { RoleDto } from "../dtos";
import { RolUpdateDto } from "../dtos";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private _roleRepo: Repository<Role>) {
  }

  async getMany(): Promise<Role[]> {
    return await this._roleRepo.find();
  }

  async getOne(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException("id must be sent");
    }
    const role = await this._roleRepo.findOneBy({ id });
    if (!role) {
      throw new NotFoundException('post not exist');
    }
    return role;
  }

  async getOneWithUsers(id: number) {
    const role = await this._roleRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        users: true,
      }
    })
    if (!role) throw new NotFoundException(`Role with id: ${id} not exist`);
    return role;
  }

  async createOne(dto: RoleDto): Promise<Role> {
    const newRol = this._roleRepo.create(dto);
    return await this._roleRepo.save(newRol);
  }

  async updateOne(id: number, dto: RolUpdateDto) {
    const role = await this.getOne(id);
    this._roleRepo.merge(role, dto);
    return await this._roleRepo.save(role);
  }

  async deleteOne(id: number) {
    const role = await this.getOne(id);
    return this._roleRepo.remove(role);
  }
}
