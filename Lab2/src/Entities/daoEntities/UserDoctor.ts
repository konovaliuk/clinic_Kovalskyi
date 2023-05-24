import { User } from "./User.js";
import { Doctor } from "./Doctor.js";
export class UserDoctor {
  private user: User;
  private doctor: Doctor;
  constructor(user: User, doctor: Doctor) {
    this.user = user;
    this.doctor = doctor;
  }
  get user_() {
    return this.user;
  }
  get doctor_() {
    return this.doctor;
  }
}
