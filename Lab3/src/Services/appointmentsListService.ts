import { MySQLDAOFactory } from "../MySQLDAOFactory/MySQLDAOFactory.js";
import { Appointment } from "../Entities/daoEntities/Appointment.js";
import { MergeArraysService } from "./mergeArrays.js";
import { AppointmentUserDoctor } from "../Entities/daoEntities/AppointmentUserDoctor.js";
import { PatientAppointmentDto } from "../Entities/dtoEntities/patientAppointment.js";
export class PatientAppointmentListService {
  getViewAppointments = (daoArray: AppointmentUserDoctor[]): PatientAppointmentDto[] => {
    const appointmentsDto: PatientAppointmentDto[] = [];
    daoArray.forEach((appointment) => {
      const { user_, appointment_, doctor_ } = appointment;
      appointmentsDto.push(new PatientAppointmentDto(appointment_, user_, doctor_));
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
    const usersIds = appointments.map((appointment) => appointment.doctor_);
    const daoFactory = MySQLDAOFactory.getInstance();
    const userDao = daoFactory.GetUserDAO();
    const users = await userDao.getUsersById(usersIds);
    const doctorDao = daoFactory.GetDoctorDAO();
    const doctors = await doctorDao.GetDoctorsByUsersIds(usersIds);
    const mergeService = new MergeArraysService();
    const usersDoctors = mergeService.mergeUsersDoctors(users, doctors);
    const appointmentsList = mergeService.mergeAppointmentsUD(appointments, usersDoctors);
    return appointmentsList;
  };
  formUpcomingAppointmenstList = async (userId: number): Promise<AppointmentUserDoctor[]> => {
    const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
    const appointments = await appointmentDao.GetUpcomingPatientAppointments(userId);
    if (!appointments.length) {
      const appointmentsList: AppointmentUserDoctor[] = [];
      return appointmentsList;
    }
    return await this.formAppointmentsList(appointments);
  };
  formPastAppointmentsList = async (userId: number): Promise<AppointmentUserDoctor[]> => {
    const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
    const appointments = await appointmentDao.GetPastAppointmentsByPatient(userId);
    if (!appointments.length) {
      const appointmentsList: AppointmentUserDoctor[] = [];
      return appointmentsList;
    }
    return await this.formAppointmentsList(appointments);
  };
}
