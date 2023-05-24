import { MySQLDAOFactory } from "../MySQLDAOFactory/MySQLDAOFactory.js";
import { Appointment } from "../Entities/daoEntities/Appointment.js";
import { MergeArraysService } from "./mergeArrays.js";
import { AppointmentUserDoctor } from "../Entities/daoEntities/AppointmentUserDoctor.js";
import { PatientAppointmentDto } from "../Entities/dtoEntities/patientAppointment.js";
import { Injectable } from "@nestjs/common";
@Injectable()
export class PatientAppointmentListService {
  getViewAppointments = (daoArray: AppointmentUserDoctor[]): PatientAppointmentDto[] => {
    const appointmentsDto: PatientAppointmentDto[] = [];
    daoArray.forEach((appointment_) => {
      const { user, appointment, doctor } = appointment_;
      console.log(doctor);
      appointmentsDto.push(new PatientAppointmentDto(appointment, user, doctor));
    });
    return appointmentsDto;
  };
  async setRate(appointmentId: number, rate: number) {
    const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
    await appointmentDao.SetRate(appointmentId, rate).catch((err) => {
      throw err;
    });
  }
  formAppointmentsList = async (appointments: Appointment[]): Promise<AppointmentUserDoctor[]> => {
    const doctorsIds = appointments.map((appointment) => appointment.doctor);
    const daoFactory = MySQLDAOFactory.getInstance();
    const userDao = daoFactory.GetUserDAO();
    const doctorDao = daoFactory.GetDoctorDAO();
    try {
      const doctors = await doctorDao.GetDoctorByID(doctorsIds);
      const usersIds = doctors.map((doctor) => doctor.userID);
      const users = await userDao.getUsersById(usersIds);
      const mergeService = new MergeArraysService();
      const usersDoctors = mergeService.mergeUsersDoctors(users, doctors);
      const appointmentsList = mergeService.mergeAppointmentsUD(appointments, usersDoctors);
      return appointmentsList;
    } catch (err) {
      throw err;
    }
  };
  formUpcomingAppointmenstList = async (userId: number): Promise<AppointmentUserDoctor[]> => {
    const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
    try {
      const appointments = await appointmentDao.GetUpcomingPatientAppointments(userId);
      if (!appointments.length) {
        const appointmentsList: AppointmentUserDoctor[] = [];
        return appointmentsList;
      }
      return await this.formAppointmentsList(appointments);
    } catch (err) {
      throw err;
    }
  };
  formPastAppointmentsList = async (userId: number): Promise<AppointmentUserDoctor[]> => {
    const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
    try {
      const appointments = await appointmentDao.GetPastAppointmentsByPatient(userId);
      if (!appointments.length) {
        const appointmentsList: AppointmentUserDoctor[] = [];
        return appointmentsList;
      }
      return await this.formAppointmentsList(appointments);
    } catch (err) {
      throw err;
    }
  };
}
