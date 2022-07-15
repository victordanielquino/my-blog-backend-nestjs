import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Rol } from "../entities";
import { RolCreateDto } from "../dtos";
import { RolUpdateDto } from "../dtos";

@Injectable()
export class RolService {
  constructor(@InjectRepository(Rol) private _rolRepo: Repository<Rol>) {
  }

  async getMany() {
    return await this._rolRepo.find();
  }

  getOne(id: number) {
    const rol = this._rolRepo.findOne({
      where: {
        id: id,
      }
    })
    if (!rol) throw new NotFoundException(`Rol with id: ${id} not exist`);
    return rol;
  }

  createOne(dto: RolCreateDto) {
    console.log(dto);
    /*const newRol = this._rolRepo.create(dto);
    return this._rolRepo.save(newRol);*/
  }

  async updateOne(id: number, dto: RolUpdateDto) {
    /*const rol = await this.getOne(id);
    this._rolRepo.merge(rol, dto);
    return this._rolRepo.save(rol);*/
  }

  deleteOne(id: number) {
    return this._rolRepo.delete(id);
  }
}
