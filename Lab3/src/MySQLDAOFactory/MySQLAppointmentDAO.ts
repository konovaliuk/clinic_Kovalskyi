import { MoreThan, LessThan, Connection } from "typeorm";
import { AppointmentDAO } from "../DAOfactory/IAppointmentDAO.js";
import { AppDataSource } from "../dataSource.js";
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
  async InsertAppointment(appointment: Appointment): Promise<void> {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    await appointmentRepository.save(appointment);
  }

  async GetAllPatientAppointments(patientID: number): Promise<Appointment[]> {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointments = await appointmentRepository.find({
      where: { patient: patientID },
    });
    return appointments;
  }
  async SetRate(appointmentId: number, rate: number): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .update(Appointment)
      .set({ rate: rate })
      .where("id = :appointmentId", { appointmentId })
      .execute();
  }
  async GetUpcomingDoctorAppointments(doctorId: number): Promise<Appointment[]> {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointments = await appointmentRepository.find({
      where: { date: MoreThan(new Date()), doctor: doctorId },
    });
    return appointments;
  }

  async GetUpcomingPatientAppointments(patientId: number): Promise<Appointment[]> {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointments = await appointmentRepository.find({
      where: { date: MoreThan(new Date()), patient: patientId },
    });
    return appointments;
  }

  async GetPastAppointmentsByPatient(patientId: number): Promise<Appointment[]> {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointments = await appointmentRepository.find({
      where: { date: LessThan(new Date()), patient: patientId },
    });
    return appointments;
  }

  async GetPastAppointmentsByDoctor(doctorId: number): Promise<Appointment[]> {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointments = await appointmentRepository.find({
      where: { date: LessThan(new Date()), doctor: doctorId },
    });
    return appointments;
  }

  async GetDoctorDaySchedule(doctorId: number, date: Date): Promise<Appointment[]> {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointments = await appointmentRepository
      .createQueryBuilder()
      .select("appointment")
      .where("YEAR(appointment.date) = :year", { year })
      .andWhere("MONTH(appointment.date) = :month", { month })
      .andWhere("DAY(appointment.date) = :day", { day })
      .andWhere("appointment.doctor = :doctorId", { doctorId })
      .getMany();
    return appointments;
  }
}
