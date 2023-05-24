import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Appointment } from "./Appointment.js";
import { User } from "./User.js";
import { DoctorSpecialisation } from "./DoctorSpecialisation.js";

@Index("IDX_e573a17ab8b6eea2b7fe9905fa", ["userID"], { unique: true })
@Entity("doctor", { schema: "clinic" })
export class Doctor {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "cabinet" })
  cabinet: number;

  @Column("tinyint", { name: "isWork" })
  isWork: boolean;

  @Column("int", { name: "userId", unique: true })
  userID: number;

  @Column("float", { name: "averagerate", nullable: true, precision: 12 })
  averageRate: number | null;

  constructor(cabinet: number, isWork: boolean, userID: number, averageRate: number | null) {
    this.userID = userID;
    this.cabinet = cabinet;
    this.isWork = isWork;
    this.averageRate = averageRate;
  }
}
