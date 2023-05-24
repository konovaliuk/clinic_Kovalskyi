import { User } from "./User.js";
export class Patient extends User {
  constructor(patient: {
    id: number;
    name: string;
    surname: string;
    login: string;
  }) {
    const { id, name, surname, login } = patient;
    super(id, name, surname, login);
  }
}
