import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  postedBy: User;

  @Column()
  text: string;

  @Column({ type: "bigint" })
  postedAt: number;

  @Column({ default: false })
  isDeleted: boolean;
}
