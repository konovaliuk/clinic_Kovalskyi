import { DoctorDAO } from "../DAOfactory/IDoctorDAO.js";
import { mysqlconnectionsPool } from "../mysql.js";
import { Doctor } from "../Entities/daoEntities/Doctor.js";

export class MySQLDoctorDAO implements DoctorDAO {
  private constructor() {}
  private static instance: MySQLDoctorDAO;
  public static getInstance(): MySQLDoctorDAO {
    if (!MySQLDoctorDAO.instance) {
      MySQLDoctorDAO.instance = new MySQLDoctorDAO();
    }
    return MySQLDoctorDAO.instance;
  }
  InsertDoctor(doctor: Doctor): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "INSERT INTO doctor(cabinet, isWork, userID) VALUES (?, ?, ?)",
          [doctor.cabinet_, doctor.isWork_, doctor.userID_],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  UpdateisWork(doctorID: number, isWork: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute("UPDATE doctor SET isWork = ? WHERE id = ?", [isWork, doctorID], function (err, results) {
          connection.release();
          return err ? reject(err) : resolve();
        });
      });
    });
  }
  UpdateCabinet(doctorID: number, cabinet: number | null): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute("UPDATE doctor SET cabinet = ? WHERE id = ?", [cabinet, doctorID], function (err, results) {
          connection.release();
          return err ? reject(err) : resolve();
        });
      });
    });
  }
  GetDoctorsByUsersIds(userIds: number[]): Promise<Doctor[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        let query = "SELECT * FROM doctor WHERE userid IN (";
        for (let i = 0; i < userIds.length; i++) query += "?,";
        query = query.slice(0, -1);
        query += ")";
        connection.execute(query, userIds, function (err, results) {
          connection.release();
          if (err) return reject(err);
          let doctors: Doctor[] = [];
          results.forEach((element) => {
            element.isWork = Boolean(element.isWork);
            doctors.push(new Doctor(element));
          });
          resolve(doctors);
        });
      });
    });
  }
  GetDoctorByID(ids: number[]): Promise<Doctor[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        let query = "SELECT * FROM doctor WHERE id IN (";
        for (let i = 0; i < ids.length; i++) query += "?,";
        query = query.slice(0, -1);
        query += ")";
        connection.execute(query, ids, function (err, results) {
          connection.release();
          if (err) return reject(err);

          let doctors: Doctor[] = [];
          results.forEach((element) => {
            element.isWork = Boolean(element.isWork);
            doctors.push(new Doctor(element));
          });
          resolve(doctors);
        });
      });
    });
  }
}
