import { Appointment } from "./Appointment.js";
import { User } from "./User.js";
import { Doctor } from "./Doctor.js";
export class AppointmentUserDoctor {
  private appointment: Appointment;
  private user: User;
  private doctor: Doctor;
  constructor(appointment: Appointment, user: User, doctor: Doctor) {
    this.appointment = appointment;
    this.user = user;
    this.doctor = doctor;
  }
  get appointment_() {
    return this.appointment;
  }
  get user_() {
    return this.user;
  }
  get doctor_() {
    return this.doctor;
  }
}
