import { Doctor } from "../daoEntities/Doctor.js";
import { User } from "../daoEntities/User.js";
export class DoctorDto {
  private userid_: number;
  private name_: string;
  private surname_: string;
  private rate_: number | null;
  private cabinet_: number | null;
  constructor(doctor: Doctor, user: User) {
    this.name_ = user.name_;
    this.surname_ = user.surname_;
    this.rate_ = doctor.averageRate_;
    this.cabinet_ = doctor.cabinet_;
    this.userid_ = user.id_;
  }
  get userId() {
    return this.userid_;
  }
  get name() {
    return this.name_;
  }
  get surname() {
    return this.surname_;
  }
  get rate() {
    return this.rate_;
  }
  get cabinet() {
    return this.cabinet_;
  }
}
