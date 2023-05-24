import { User } from "./User.js";
export class Doctor extends User {
  protected cabinet: number | null;
  protected isWork: boolean;
  constructor(doctor: {
    id: number;
    name: string;
    surname: string;
    login: string;
    cabinet: number | null;
    isWork: boolean;
  }) {
    const { id, name, surname, login, cabinet, isWork } = doctor;
    super(id, name, surname, login);
    this.cabinet = cabinet;
    this.isWork = isWork;
  }
  get cabinet_() {
    return this.cabinet;
  }
  get isWork_() {
    return this.isWork;
  }
  set cabinet_(cabinet) {
    this.cabinet = cabinet;
  }
  set isWork_(isWork: boolean) {
    this.isWork = isWork;
  }
}
