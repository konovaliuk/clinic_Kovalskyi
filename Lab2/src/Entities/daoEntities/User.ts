class User {
  private id: number;
  private name: string;
  private surname: string;
  private login: string;
  private password: string;
  private role: number;
  constructor(user: { id: number; name: string; surname: string; login: string; password: string; role: number }) {
    const { id, name, surname, login, password, role } = user;
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.login = login;
    this.password = password;
    this.role = role;
  }

  get role_() {
    return this.role;
  }
  get id_() {
    return this.id;
  }
  get name_() {
    return this.name;
  }
  get surname_() {
    return this.surname;
  }
  get login_() {
    return this.login;
  }
  set name_(name) {
    this.name = name;
  }
  set surname_(surname) {
    this.surname = surname;
  }
  set login_(login) {
    this.login = login;
  }
}

export { User };
