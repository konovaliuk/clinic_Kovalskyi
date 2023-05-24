import { Diagnose } from "../Entities/Diagnose.js";

export interface DiagnoseDAO {
  GetDiagnoseByPatient(patientID: number): Promise<Diagnose[]>;
  InsertDiagnose(diagnose: Diagnose): Promise<void>;
  DeleteDiagnose(diagnoseID: number): Promise<void>;
}
