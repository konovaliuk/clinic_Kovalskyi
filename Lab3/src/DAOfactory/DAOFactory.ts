import * as DAOpkg from "./DAOpkg.js";
export abstract class DAOFactory {
  abstract GetAppointmentDAO(): DAOpkg.AppointmentDAO;
  abstract GetDiagnoseDAO(): DAOpkg.DiagnoseDAO;

  abstract GetDoctorDAO(): DAOpkg.DoctorDAO;
  abstract GetDoctorSpecialisationDAO(): DAOpkg.DoctorSpecialisationDAO;

  abstract GetReceiptDAO(): DAOpkg.ReceiptDAO;
  abstract GetSpecialisationDAO(): DAOpkg.SpecialisationDAO;
  abstract GetUserDAO(): DAOpkg.UserDAO;
}
