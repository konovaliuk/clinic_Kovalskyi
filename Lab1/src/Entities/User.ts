class User {
  protected id: number;
  protected name: string;
  protected surname: string;
  protected login: string;
  constructor(id: number, name: string, surname: string, login: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.login = login;
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
