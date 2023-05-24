import { Diagnose } from "../Entities/daoEntities/Diagnose.js";

export interface DiagnoseDAO {
  GetDiagnoseByPatient(patientID: number): Promise<Diagnose[]>;
  InsertDiagnose(diagnose: Diagnose): Promise<void>;
  DeleteDiagnose(diagnoseID: number): Promise<void>;
  getDiagnosesByAppointment(appointmentId: number): Promise<Diagnose[]>;
}
