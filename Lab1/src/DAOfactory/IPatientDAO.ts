import { Patient } from "../Entities/Patient.js";
export interface PatientDAO {
  InsertPatient(patient: Patient): Promise<void>;
  UpdatePatient(newPatient: Patient, patientID: number): Promise<void>;
}
