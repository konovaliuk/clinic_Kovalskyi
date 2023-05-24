import { Doctor } from "../daoEntities/Doctor.js";
import { User } from "../daoEntities/User.js";
export class DoctorDto {
  private id_: number;
  private userid_: number;
  private name_: string;
  private surname_: string;
  private rate_: number | null;
  private cabinet_: number | null;
  constructor(doctor: Doctor, user: User) {
    this.name_ = user.name;
    this.id_ = doctor.id;
    this.surname_ = user.surname;
    this.rate_ = doctor.averageRate;
    this.cabinet_ = doctor.cabinet;
    this.userid_ = user.id;
  }
  get id() {
    return this.id_;
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
