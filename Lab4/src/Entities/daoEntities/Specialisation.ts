import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { DoctorSpecialisation } from "./DoctorSpecialisation.js";

@Index("uniqueSpec", ["name"], { unique: true })
@Entity("specialisation", { schema: "clinic" })
export class Specialisation {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
