import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Rol } from "../entities";
import { RolDto } from "../dtos";
import { RolUpdateDto } from "../dtos";

@Injectable()
export class RolService {
  constructor(@InjectRepository(Rol) private _rolRepo: Repository<Rol>) {
  }

  async getMany() {
    return await this._rolRepo.find();
  }

  getOne(id: number) {
    const rol = this._rolRepo.findOneBy({ id });
    if (!rol) throw new NotFoundException(`Rol with id: ${id} not exist`);
    return rol;
  }

  getOneWithUsers(id: number) {
    const rol = this._rolRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        users: true,
      }
    })
    if (!rol) throw new NotFoundException(`Rol with id: ${id} not exist`);
    return rol;
  }

  createOne(dto: RolDto) {
    const newRol = this._rolRepo.create(dto as any);
    return this._rolRepo.save(newRol);
  }

  async updateOne(id: number, dto: RolUpdateDto) {
    const rol = await this.getOne(id);
    this._rolRepo.merge(rol, dto as any);
    return this._rolRepo.save(rol);
  }

  async deleteOne(id: number) {
    const rol = await this.getOne(id);
    return this._rolRepo.remove(rol);
  }
}
