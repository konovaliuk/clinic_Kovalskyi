import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Doctor } from "./Doctor.js";
import { Specialisation } from "./Specialisation.js";

@Index("uniqueDoctorSpec", ["doctor", "specialisation"], { unique: true })
//@Index("doctorspecialisation_ibfk_2_", ["specialisation"], {})
@Entity("doctorspecialisation", { schema: "clinic" })
export class DoctorSpecialisation {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "doctor" })
  doctor: number;

  @Column("int", { name: "specialisation" })
  specialisation: number;

  constructor(doctor: number, specialisation: number) {
    this.doctor = doctor;
    this.specialisation = specialisation;
  }
}
