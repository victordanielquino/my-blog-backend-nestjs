import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./user.entity";
import { Exclude } from "class-transformer";

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', unique: true, nullable: false})
  description: string;

  @Column({ type: 'varchar', length: 5, default: 'AC'})
  state: string;

  @ManyToMany(type => User, user => user.roles)
  @JoinColumn()
  users: User[];

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
}
