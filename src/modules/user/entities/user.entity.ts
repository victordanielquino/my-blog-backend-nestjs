import {
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Rol } from "./rol.entity";
import { hash } from "bcrypt";
import { MaxLength, MinLength } from "class-validator";
import { StateEnum } from "../../../shared/enums";
import { Exclude } from "class-transformer";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(6)
  @MaxLength(128)
  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Exclude()
  @MinLength(6)
  @MaxLength(128)
  @Column({ type: 'varchar', length: 255})
  password: string;

  @Column({type: 'boolean', default: false})
  enabled: boolean;

  @Column({type: 'varchar', length: 5})
  state: StateEnum[];

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Rol, (rol) => rol.users)
  rol: Rol;

  @BeforeInsert()
  @BeforeUpdate()
  async hasPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}