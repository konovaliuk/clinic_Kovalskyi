import { DiagnoseDAO } from "../DAOfactory/IDiagnoseDAO.js";
import { mysqlconnectionsPool } from "../mysql.js";
import { Diagnose } from "../Entities/daoEntities/Diagnose.js";

export class MySQLDiagnoseDAO implements DiagnoseDAO {
  private constructor() {}
  private static instance: MySQLDiagnoseDAO;
  public static getInstance(): MySQLDiagnoseDAO {
    if (!MySQLDiagnoseDAO.instance) {
      MySQLDiagnoseDAO.instance = new MySQLDiagnoseDAO();
    }
    return MySQLDiagnoseDAO.instance;
  }
  GetDiagnoseByPatient(patientID: number): Promise<Diagnose[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute("SELECT * FROM Diagnose WHERE patient = ?", [patientID], function (err, results) {
          connection.release();
          if (err) return reject(err);

          let diagnoses: Diagnose[] = [];
          results.forEach((diagnose) => diagnoses.push(new Diagnose(diagnose)));
          resolve(diagnoses);
        });
      });
    });
  }
  InsertDiagnose(diagnose: Diagnose): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "INSERT INTO diagnose(appointment, disease, recommendations, patient) VALUES (?, ?, ?, ?)",
          [diagnose.appointment_, diagnose.disease_, diagnose.recommendations_, diagnose.patient_],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  DeleteDiagnose(diagnoseID: number): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute("DELETE FROM diagnose WHERE id = ?", [diagnoseID], function (err, results) {
          connection.release();
          return err ? reject(err) : resolve();
        });
      });
    });
  }
  getDiagnosesByAppointment(appointmentId: number): Promise<Diagnose[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute("SELECT * FROM Diagnose WHERE appointment = ?", [appointmentId], function (err, results) {
          connection.release();
          if (err) return reject(err);

          let diagnoses: Diagnose[] = [];
          results.forEach((diagnose) => diagnoses.push(new Diagnose(diagnose)));
          resolve(diagnoses);
        });
      });
    });
  }
}
