import { MySQLDAOFactory } from "../MySQLDAOFactory/MySQLDAOFactory.js";
import { Specialisation } from "../Entities/daoEntities/Specialisation.js";
import { MergeArraysService } from "./mergeArrays.js";
import { DoctorDto } from "../Entities/dtoEntities/doctor.js";
import { UserDoctor } from "../Entities/daoEntities/UserDoctor.js";
import { Calendar } from "../types/calendar.js";
import { Appointment } from "../Entities/daoEntities/Appointment.js";
export class MakeAppointmentService {
  makeAppointment = async (doctor: number, date: string, patient: number) => {
    let appointment = { id: 0, doctor, patient, date, rate: null };
    const appointment_ = new Appointment(appointment);
    const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
    await appointmentDao.InsertAppointment(appointment_);
  };
  getDoctorSchedule = async (doctorId: number, date: string): Promise<string[]> => {
    const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
    const appointments = await appointmentDao.GetDoctorDaySchedule(doctorId, new Date(date));
    if (!appointments) return [];
    const doctorSchedule: string[] = [];
    appointments.forEach((appointment) => doctorSchedule.push(appointment.date_.slice(11, 16)));
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
      const { user_, doctor_ } = userDoctor;
      doctorsDto.push(new DoctorDto(doctor_, user_));
    });
    return doctorsDto;
  };
  formDoctorsList = async (specialisationId: number) => {
    const daoFactory = MySQLDAOFactory.getInstance();
    const doctorSpecialisationDao = daoFactory.GetDoctorSpecialisationDAO();
    const doctorSpecialisations = await doctorSpecialisationDao.GetBySpecialisation(specialisationId);
    if (!doctorSpecialisations) return undefined;
    const doctorIds = doctorSpecialisations.map((doctorSpecialisation) => doctorSpecialisation.doctor_);
    const doctorDao = daoFactory.GetDoctorDAO();
    const doctors = await doctorDao.GetDoctorByID(doctorIds);
    if (!doctors) return undefined;
    const activeDoctors = doctors.filter((doctor) => doctor.isWork_);
    const userIds = activeDoctors.map((activeDoctor) => activeDoctor.userID_);
    const userDao = daoFactory.GetUserDAO();
    const users = await userDao.getUsersById(userIds);
    if (!users) return undefined;
    const mergeService = new MergeArraysService();
    const doctorsList = mergeService.mergeUsersDoctors(users, activeDoctors);
    return doctorsList;
  };
}
