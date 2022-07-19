import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'posts'})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  title: string;

  @Column({ type: 'varchar', length: 255})
  description: string;
}