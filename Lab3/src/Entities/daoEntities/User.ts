import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Appointment } from "./Appointment.js";
import { Doctor } from "./Doctor.js";
import { UserRole } from "../../types/roles.js";
@Index("idx_login_password", ["login", "password"], { unique: true })
@Entity("user", { schema: "clinic" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "surname", length: 255 })
  surname: string;

  @Column("varchar", { name: "login", length: 255 })
  login: string;

  @Column("varchar", { name: "password", length: 8 })
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  constructor(name: string, surname: string, login: string, password: string, role: number) {
    this.name = name;
    this.surname = surname;
    this.login = login;
    this.password = password;
    this.role = role;
  }
}
