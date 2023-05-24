import { PatientDAO } from "../DAOfactory/IPatientDAO";
import { mysqlconnectionsPool } from "../mysql.js";
import { Patient } from "../Entities/Patient.js";
export class MySQLPatientDAO implements PatientDAO {
  private constructor() {}
  private static instance: MySQLPatientDAO;
  public static getInstance(): MySQLPatientDAO {
    if (!MySQLPatientDAO.instance) {
      MySQLPatientDAO.instance = new MySQLPatientDAO();
    }
    return MySQLPatientDAO.instance;
  }
  InsertPatient(patient: Patient): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "INSERT INTO patient(name, surname, login) VALUES (?, ?, ?)",
          [patient.name_, patient.surname_, patient.login_],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  UpdatePatient(newPatient: Patient, patientID: number): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "UPDATE patient SET name = ?, surname = ?, login = ? WHERE id = ?",
          [newPatient.name_, newPatient.surname_, newPatient.login_, patientID],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
}
