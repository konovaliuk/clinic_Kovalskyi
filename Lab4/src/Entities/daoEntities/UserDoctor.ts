import { User } from "./User.js";
import { Doctor } from "./Doctor.js";
export class UserDoctor {
  private user_: User;
  private doctor_: Doctor;
  constructor(user: User, doctor: Doctor) {
    this.user_ = user;
    this.doctor_ = doctor;
  }
  get user() {
    return this.user_;
  }
  get doctor() {
    return this.doctor_;
  }
}
