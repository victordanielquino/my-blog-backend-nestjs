import {
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn, ManyToMany, JoinTable, OneToMany
} from "typeorm";

import { Role } from "./role.entity";
import { hash } from "bcrypt";
import { MaxLength, MinLength } from "class-validator";
import { StateEnum } from "../../../shared/enums";
import { Exclude } from "class-transformer";
import { Post } from "../../post/post.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(4)
  @MaxLength(128)
  @Column({ type: 'varchar', length: 25, unique: true, nullable: false })
  username: string;

  @Exclude()
  @MinLength(6)
  @MaxLength(128)
  @Column({ type: 'varchar', length: 255})
  password: string;

  @Column({type: 'boolean', default: true})
  enabled: boolean;

  @Column({type: 'varchar', length: 5, default: 'AC'})
  state: string;

  @ManyToMany(type => Role, role => role.users, { eager: true })
  @JoinTable({ name: 'users_roles', joinColumn: {name: 'user_id'}, inverseJoinColumn: {name:'role_id'} })
  roles: Role[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hasPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}