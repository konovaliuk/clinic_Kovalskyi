import { DoctorDAO } from "../DAOfactory/IDoctorDAO.js";
import { mysqlconnectionsPool } from "../mysql.js";
import { Doctor } from "../Entities/Doctor.js";

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
        if (err) reject(err);
        connection.execute(
          "INSERT INTO doctor(name, surname, login, cabinet, isWork) VALUES (?, ?, ?, ?, ?)",
          [
            doctor.name_,
            doctor.surname_,
            doctor.login_,
            doctor.cabinet_,
            doctor.isWork_,
          ],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  UpdateisWork(login: string, isWork: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "UPDATE doctor SET isWork = ? WHERE login = ?",
          [isWork, login],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  UpdateCabinet(doctorLogin: string, cabinet: number | null): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "UPDATE doctor SET cabinet = ? WHERE login = ?",
          [cabinet, doctorLogin],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  GetDoctorByLogin(login: string): Promise<Doctor> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "SELECT * FROM doctor WHERE login = ?",
          [login],
          function (
            err,
            results: {
              id: number;
              name: string;
              surname: string;
              login: string;
              cabinet: number;
              isWork: any; // 1 | 0
            }[]
          ) {
            connection.release();
            if (err) reject(err);
            else if (results.length === 0) reject("Empty");
            const doctor = results[0];
            doctor.isWork = Boolean(doctor.isWork);
            resolve(new Doctor(doctor));
          }
        );
      });
    });
  }
  GetDoctorByID(ids: number[]): Promise<Doctor[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        let query = "SELECT * FROM doctor WHERE id IN (";
        for (let i = 0; i < ids.length; i++) query += "?,";
        query = query.slice(0, -1);
        query += ")";
        connection.execute(
          query,
          ids,
          function (
            err,
            results: {
              id: number;
              name: string;
              surname: string;
              login: string;
              cabinet: number;
              isWork: any; // 1 | 0
            }[]
          ) {
            connection.release();
            if (err) reject(err);
            else if (results.length === 0) reject("Empty");
            let doctors: Doctor[] = [];
            results.forEach((element) => {
              element.isWork = Boolean(element.isWork);
              doctors.push(new Doctor(element));
            });
            resolve(doctors);
          }
        );
      });
    });
  }
}
