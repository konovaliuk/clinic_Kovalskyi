import * as DAOpkg from "./DAOpkg.js";
export abstract class DAOFactory {
  abstract GetAppointmentDAO(): DAOpkg.AppointmentDAO;
  abstract GetDiagnoseDAO(): DAOpkg.DiagnoseDAO;
  abstract GetDiseaseDAO(): DAOpkg.DiseaseDAO;
  abstract GetDoctorDAO(): DAOpkg.DoctorDAO;
  abstract GetDoctorSpecialisationDAO(): DAOpkg.DoctorSpecialisationDAO;
  abstract GetPatientDAO(): DAOpkg.PatientDAO;
  abstract GetReceiptDAO(): DAOpkg.ReceiptDAO;
  abstract GetSpecialisationDAO(): DAOpkg.SpecialisationDAO;
  abstract GetAdminDAO(): DAOpkg.AdminDAO;
}
