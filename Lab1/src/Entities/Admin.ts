import { User } from "./User.js";
export class Admin extends User {
  protected password: string;
  constructor(admin: {
    id: number;
    name: string;
    surname: string;
    login: string;
    password: string;
  }) {
    const { id, name, surname, login, password } = admin;
    super(id, name, surname, login);
    this.password = password;
  }
  set password_(password: string) {
    this.password = password;
  }
}
