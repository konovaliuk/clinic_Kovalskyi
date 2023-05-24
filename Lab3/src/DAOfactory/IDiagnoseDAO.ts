import { Diagnose } from "../Entities/daoEntities/Diagnose.js";

export interface DiagnoseDAO {
  InsertDiagnose(diagnose: Diagnose): Promise<void>;
  getDiagnosesByAppointment(appointmentId: number): Promise<Diagnose[]>;
}
