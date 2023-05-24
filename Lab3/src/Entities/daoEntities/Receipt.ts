import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Diagnose } from "./Diagnose.js";

//@Index("receipt_ibfk_1_", ["diagnose"], {})
@Entity("receipt", { schema: "clinic" })
export class Receipt {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "diagnose" })
  diagnose: number;

  @Column("varchar", { name: "medicine", length: 255 })
  medicine: string;

  @Column("varchar", { name: "dose", nullable: true, length: 255 })
  dose: string | null;

  constructor(diagnose: number, medicine: string, dose: string | null) {
    this.diagnose = diagnose;
    this.medicine = medicine;
    this.dose = dose;
  }
}
