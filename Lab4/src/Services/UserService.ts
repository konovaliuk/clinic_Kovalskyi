import { MySQLDAOFactory } from "../MySQLDAOFactory/MySQLDAOFactory.js";
import { User } from "../Entities/daoEntities/User.js";
import { Injectable } from "@nestjs/common";
import { UserRole } from "../types/roles.js";
import { Doctor } from "../Entities/daoEntities/Doctor.js";
import { AppDataSource } from "../dataSource.js";
import { InsertDoctorTransaction } from "../transactions/insertDoctor.js";
@Injectable()
export class UserService {
  constructor() {}
  async validateUser(login: string, password: string): Promise<User | null> {
    const daoFactory = MySQLDAOFactory.getInstance();
    const userDao = daoFactory.GetUserDAO();
    const user = await userDao.GetUserByLoginPassword(login, password).catch((err) => {
      throw err;
    });
    return user;
  }
  async insertUser(name: string, surname: string, password: string, login: string): Promise<User> {
    const patient = new User(name, surname, login, password, UserRole.patient);
    const daoFactory = MySQLDAOFactory.getInstance();
    const userDao = daoFactory.GetUserDAO();
    return await userDao.Insert(patient).catch((err) => {
      throw err;
    });
  }
  async insertDoctor(
    name: string,
    surname: string,
    password: string,
    login: string,
    cabinet: number,
    specialisation: string
  ): Promise<User> {
    const doctor = {
      name,
      surname,
      password,
      login,
      cabinet,
      specialisation,
    };
    const transaction = new InsertDoctorTransaction();
    const user = await transaction.run(doctor).catch((err) => {
      throw err;
    });
    return user;
  }
  async updateDoctor(doctorId: number, isWork: boolean) {
    const daoFactory = MySQLDAOFactory.getInstance();
    const doctorDao = daoFactory.GetDoctorDAO();
    await doctorDao.UpdateisWork(doctorId, isWork).catch((err) => {
      throw err;
    });
  }
}
