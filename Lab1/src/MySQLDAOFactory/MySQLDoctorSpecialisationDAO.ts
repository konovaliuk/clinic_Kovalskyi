import { DoctorSpecialisationDAO } from "../DAOfactory/IDoctorSpecialisation.js";
import { mysqlconnectionsPool } from "../mysql.js";
import { DoctorSpecialisation } from "../Entities/DoctorSpecialisation.js";
export class MySQLDoctorSpecialisationDAO implements DoctorSpecialisationDAO {
  private constructor() {}
  private static instance: MySQLDoctorSpecialisationDAO;
  public static getInstance(): MySQLDoctorSpecialisationDAO {
    if (!MySQLDoctorSpecialisationDAO.instance) {
      MySQLDoctorSpecialisationDAO.instance =
        new MySQLDoctorSpecialisationDAO();
    }
    return MySQLDoctorSpecialisationDAO.instance;
  }
  GetByDoctor(doctorID: number): Promise<DoctorSpecialisation[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "SELECT * FROM doctorspecialisation WHERE doctor = ?",
          [doctorID],
          function (err, results) {
            connection.release();
            if (err) reject(err);
            else if (results.length === 0) reject("Empty");
            const specialisations: DoctorSpecialisation[] = [];
            results.forEach((specialisation) =>
              specialisations.push(new DoctorSpecialisation(specialisation))
            );
            resolve(specialisations);
          }
        );
      });
    });
  }
  GetBySpecialisation(
    specialisationID: number
  ): Promise<DoctorSpecialisation[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "SELECT * FROM doctorspecialisation WHERE specialisation = ?",
          [specialisationID],
          function (err, results) {
            connection.release();
            if (err) reject(err);
            else if (results.length === 0) reject("Empty");
            let specialisations: DoctorSpecialisation[] = [];
            results.forEach((specialisation) =>
              specialisations.push(new DoctorSpecialisation(specialisation))
            );
            resolve(specialisations);
          }
        );
      });
    });
  }
  Insert(doctorSpecialisation: DoctorSpecialisation): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "INSERT INTO doctorspecialisation(doctor, specialisation) VALUES (?, ?)",
          [doctorSpecialisation.doctor_, doctorSpecialisation.specialisation_],
          function (err, results) {
            connection.release();
            if (err) reject(err);
            resolve();
          }
        );
      });
    });
  }
}
