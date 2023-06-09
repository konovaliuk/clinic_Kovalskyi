import { AppointmentDAO } from "../DAOfactory/IAppointmentDAO.js";
import { mysqlconnectionsPool } from "../mysql.js";
import { Appointment } from "../Entities/daoEntities/Appointment.js";

export class MySQLAppointmentDAO implements AppointmentDAO {
  private constructor() {}
  private static instance: MySQLAppointmentDAO;
  public static getInstance(): MySQLAppointmentDAO {
    if (!MySQLAppointmentDAO.instance) {
      MySQLAppointmentDAO.instance = new MySQLAppointmentDAO();
    }
    return MySQLAppointmentDAO.instance;
  }
  InsertAppointment(appointment: Appointment): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "INSERT INTO appointment(doctor, patient, date) VALUES (?, ?, ?)",
          [appointment.doctor_, appointment.patient_, appointment.date_],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  DeleteAppointment(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute("DELETE FROM appointment WHERE id = ?", [id], function (err, results) {
          connection.release();
          return err ? reject(err) : resolve();
        });
      });
    });
  }
  SetRate(appointmentID: number, rate: number): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "UPDATE appointment SET rate = ? WHERE id = ?",
          [rate, appointmentID],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  GetUpcomingDoctorAppointments(doctorID: number): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "SELECT * FROM appointment WHERE doctor = ? AND date > CURRENT_TIMESTAMP",
          [doctorID],
          function (err, results) {
            connection.release();
            if (err) return reject(err);
            let appointments: Appointment[] = [];
            results.forEach((appointment) => appointments.push(new Appointment(appointment)));
            resolve(appointments);
          }
        );
      });
    });
  }
  GetUpcomingPatientAppointments(patientID: number): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "SELECT * FROM appointment WHERE patient = ? AND date > CURRENT_TIMESTAMP",
          [patientID],
          function (err, results) {
            connection.release();
            if (err) return reject(err);
            let appointments: Appointment[] = [];
            results.forEach((appointment) => appointments.push(new Appointment(appointment)));
            resolve(appointments);
          }
        );
      });
    });
  }
  GetAllPatientAppointments(patientID: number): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute("SELECT * FROM appointment WHERE patient = ?", [patientID], function (err, results) {
          connection.release();
          if (err) return reject(err);
          let appointments: Appointment[] = [];
          results.forEach((appointment) => appointments.push(new Appointment(appointment)));
          resolve(appointments);
        });
      });
    });
  }
  GetPastAppointmentsByPatient(patientId: number): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "SELECT * FROM appointment WHERE patient = ? AND date < CURRENT_TIMESTAMP",
          [patientId],
          function (err, results) {
            connection.release();
            if (err) return reject(err);
            let appointments: Appointment[] = [];
            results.forEach((appointment) => appointments.push(new Appointment(appointment)));
            resolve(appointments);
          }
        );
      });
    });
  }
  GetPastAppointmentsByDoctor(doctorId: number): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "SELECT * FROM appointment WHERE doctor = ? AND date < CURRENT_TIMESTAMP",
          [doctorId],
          function (err, results) {
            connection.release();
            if (err) return reject(err);
            let appointments: Appointment[] = [];
            results.forEach((appointment) => appointments.push(new Appointment(appointment)));
            resolve(appointments);
          }
        );
      });
    });
  }
  GetDoctorDaySchedule(doctorId: number, date: Date): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "SELECT * FROM appointment WHERE YEAR(date) = ? AND MONTH(date) = ? AND DAY(date) = ? AND doctor = ?",
          [year, month, day, doctorId],
          function (err, results) {
            connection.release();
            if (err) return reject(err);
            let appointments: Appointment[] = [];
            results.forEach((appointment) => appointments.push(new Appointment(appointment)));
            resolve(appointments);
          }
        );
      });
    });
  }
}
