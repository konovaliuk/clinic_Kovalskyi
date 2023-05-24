import { Appointment } from "../daoEntities/Appointment.js";
import { User } from "../daoEntities/User.js";
import { Doctor } from "../daoEntities/Doctor.js";
export class PatientAppointmentDto {
  private appointmentId_: number;
  private date_: string;
  private rate_: number | null;
  private doctorName_: string;
  private doctorSurname_: string;
  private cabinet_: number | null;
  constructor(appointment: Appointment, user: User, doctor: Doctor) {
    this.appointmentId_ = appointment.id_;
    this.date_ = appointment.date_;
    this.rate_ = appointment.rate_;
    this.doctorName_ = user.name_;
    this.doctorSurname_ = user.surname_;
    this.cabinet_ = doctor.cabinet_;
  }
  get id() {
    return this.appointmentId_;
  }
  get date() {
    return this.date_;
  }
  get rate() {
    return this.rate_;
  }
  get doctorName() {
    return this.doctorName_;
  }
  get doctorSurname() {
    return this.doctorSurname_;
  }
  get cabinet() {
    return this.cabinet_;
  }
}
