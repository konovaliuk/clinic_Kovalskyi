import * as MySQLDAOpkg from "./MySQLDAOpkg.js";
import * as DAOpkg from "../DAOfactory/DAOpkg.js";
import { DAOFactory } from "../DAOfactory/DAOFactory.js";
export class MySQLDAOFactory extends DAOFactory {
  private constructor() {
    super();
  }
  private static instance: MySQLDAOFactory;
  public static getInstance(): MySQLDAOFactory {
    if (!MySQLDAOFactory.instance) {
      MySQLDAOFactory.instance = new MySQLDAOFactory();
    }
    return MySQLDAOFactory.instance;
  }
  GetAppointmentDAO(): DAOpkg.AppointmentDAO {
    return MySQLDAOpkg.MySQLAppointmentDAO.getInstance();
  }
  GetDiagnoseDAO(): DAOpkg.DiagnoseDAO {
    return MySQLDAOpkg.MySQLDiagnoseDAO.getInstance();
  }
  GetDiseaseDAO(): DAOpkg.DiseaseDAO {
    return MySQLDAOpkg.MySQLDiseaseDAO.getInstance();
  }
  GetDoctorDAO(): DAOpkg.DoctorDAO {
    return MySQLDAOpkg.MySQLDoctorDAO.getInstance();
  }
  GetDoctorSpecialisationDAO(): DAOpkg.DoctorSpecialisationDAO {
    return MySQLDAOpkg.MySQLDoctorSpecialisationDAO.getInstance();
  }
  GetPatientDAO(): DAOpkg.PatientDAO {
    return MySQLDAOpkg.MySQLPatientDAO.getInstance();
  }
  GetReceiptDAO(): DAOpkg.ReceiptDAO {
    return MySQLDAOpkg.MySQLReceiptDAO.getInstance();
  }
  GetSpecialisationDAO(): DAOpkg.SpecialisationDAO {
    return MySQLDAOpkg.MySQLSpecialisationDAO.getInstance();
  }
  GetAdminDAO(): DAOpkg.AdminDAO {
    return MySQLDAOpkg.MySQLAdminDAO.getInstance();
  }
}
