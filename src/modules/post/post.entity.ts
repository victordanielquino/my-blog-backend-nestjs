import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/entities";

@Entity({name: 'posts'})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  title: string;

  @Column({ type: 'varchar', length: 255})
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}