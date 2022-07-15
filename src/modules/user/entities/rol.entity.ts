import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StateEnum } from "../../../shared/enums";
import { User } from "./user.entity";

@Entity({ name: 'rols' })
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 7, unique: true })
  initial: string;

  @Column({ type: 'varchar', length: 50})
  description: string;

  @Column({ type: 'varchar', length: 5, default: 'AC'})
  state: StateEnum[];

  @OneToMany(() => User, (user) => user.rol)
  users: User[];

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
}
