import { MySQLDAOFactory } from "../MySQLDAOFactory/MySQLDAOFactory.js";
import { Specialisation } from "../Entities/daoEntities/Specialisation.js";
import { MergeArraysService } from "./mergeArrays.js";
import { DoctorDto } from "../Entities/dtoEntities/doctor.js";
import { UserDoctor } from "../Entities/daoEntities/UserDoctor.js";
import { Calendar } from "../types/calendar.js";
import { Appointment } from "../Entities/daoEntities/Appointment.js";
import { Injectable } from "@nestjs/common";
@Injectable()
export class MakeAppointmentService {
  makeAppointment = async (doctor: number, date: string, patient: number) => {
    const appointment_ = new Appointment(doctor, patient, new Date(date), null);
    const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
    await appointmentDao.InsertAppointment(appointment_).catch((err) => {
      throw err;
    });
  };

  getDoctorSchedule = async (doctorId: number, date: string): Promise<string[]> => {
    const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
    const appointments = await appointmentDao.GetDoctorDaySchedule(doctorId, new Date(date)).catch((err) => {
      throw err;
    });
    const doctorSchedule: string[] = [];
    appointments.forEach((appointment) => doctorSchedule.push(appointment.date.toISOString().slice(11, 16)));
    return doctorSchedule;
  };

  getCalendarWeek = (day: number): string[] => {
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const shiftedWeek = [...week.slice(day), ...week.slice(0, day)];
    return shiftedWeek;
  };

  getCalendar = (): Calendar => {
    const calendar: Calendar = [];
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    for (let i = 0; i < 30; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i, 21);
      const dayOff = date.getDay() === 0 || date.getDay() === 6;
      calendar.push({ dayOff: dayOff, date: date });
    }
    return calendar;
  };

  getViewDoctors = (daoArray: UserDoctor[]): DoctorDto[] => {
    const doctorsDto: DoctorDto[] = [];
    daoArray.forEach((userDoctor) => {
      const { user, doctor } = userDoctor;
      doctorsDto.push(new DoctorDto(doctor, user));
    });
    return doctorsDto;
  };

  formDoctorsList = async (specialisationId: number): Promise<UserDoctor[]> => {
    const daoFactory = MySQLDAOFactory.getInstance();
    const doctorSpecialisationDao = daoFactory.GetDoctorSpecialisationDAO();
    try {
      const doctorSpecialisations = await doctorSpecialisationDao.GetBySpecialisation(specialisationId);
      if (!doctorSpecialisations) return [];
      const doctorIds = doctorSpecialisations.map((doctorSpecialisation) => doctorSpecialisation.doctor);
      const doctorDao = daoFactory.GetDoctorDAO();
      const doctors = await doctorDao.GetDoctorByID(doctorIds);
      const activeDoctors = doctors.filter((doctor) => doctor.isWork);
      if (!activeDoctors) return [];
      const userIds = activeDoctors.map((activeDoctor) => activeDoctor.userID);
      const userDao = daoFactory.GetUserDAO();
      const users = await userDao.getUsersById(userIds);
      const mergeService = new MergeArraysService();
      const doctorsList = mergeService.mergeUsersDoctors(users, activeDoctors);
      return doctorsList;
    } catch (err) {
      throw err;
    }
  };
}
