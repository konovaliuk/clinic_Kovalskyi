import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Appointment } from "./Appointment.js";
import { Receipt } from "./Receipt.js";

//@Index("diagnose_ibfk_1_", ["appointment"], {})
//@Index("diagnose_ibfk_2_", ["disease"], {})
@Entity("diagnose", { schema: "clinic" })
export class Diagnose {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "appointment" })
  appointment: number;

  @Column("varchar", { name: "disease", length: 255 })
  disease: string;

  @Column("varchar", { name: "recommendations", nullable: true, length: 255 })
  recommendations: string | null;

  constructor(appointment: number, disease: string, recommendations: string | null) {
    this.appointment = appointment;
    this.disease = disease;
    this.recommendations = recommendations;
  }
}
