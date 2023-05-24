import { Appointment } from "./Appointment.js";
import { User } from "./User.js";
import { Doctor } from "./Doctor.js";
export class AppointmentUserDoctor {
  private appointment_: Appointment;
  private user_: User;
  private doctor_: Doctor;
  constructor(appointment: Appointment, user: User, doctor: Doctor) {
    this.appointment_ = appointment;
    this.user_ = user;
    this.doctor_ = doctor;
  }
  get appointment() {
    return this.appointment_;
  }
  get user() {
    return this.user_;
  }
  get doctor() {
    return this.doctor_;
  }
}
