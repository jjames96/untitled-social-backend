import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;
}
