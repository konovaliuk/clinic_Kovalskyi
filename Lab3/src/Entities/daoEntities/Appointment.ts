import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Doctor } from "./Doctor.js";
import { User } from "./User.js";
import { Diagnose } from "./Diagnose.js";

@Entity("appointment", { schema: "clinic" })
export class Appointment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "patientId" })
  patient: number;

  @Column("int", { name: "doctorId" })
  doctor: number;

  @Column("datetime", { name: "date" })
  date: Date;

  @Column("int", { name: "rate", nullable: true })
  rate: number | null;

  constructor(doctor: number, patient: number, date: Date, rate: number | null) {
    this.doctor = doctor;
    this.patient = patient;
    this.date = date;
    this.rate = rate;
  }
}
