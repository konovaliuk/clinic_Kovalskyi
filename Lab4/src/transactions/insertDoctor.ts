import { BaseTransaction } from "./baseTransaction.js";
import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, QueryRunner } from "typeorm";
import { User } from "../Entities/daoEntities/User.js";
import { MySQLDAOFactory } from "../MySQLDAOFactory/MySQLDAOFactory.js";
import { UserRole } from "../types/roles.js";
import { Doctor } from "../Entities/daoEntities/Doctor.js";
import { specialisationEnum } from "../types/specialisation.js";
import { DoctorSpecialisation } from "../Entities/daoEntities/DoctorSpecialisation.js";

interface IDoctor {
  name: string;
  surname: string;
  password: string;
  login: string;
  cabinet: number;
  specialisation: string;
}

export class InsertDoctorTransaction extends BaseTransaction<IDoctor, User> {
  constructor() {
    super();
  }
  protected async execute(doctor: IDoctor, queryRunner: QueryRunner): Promise<User> {
    try {
      const daoFactory = MySQLDAOFactory.getInstance();
      const userDao = daoFactory.GetUserDAO();
      const doctorDao = daoFactory.GetDoctorDAO();
      const doctorSpecialisationDao = daoFactory.GetDoctorSpecialisationDAO();
      const { name, surname, login, password } = doctor;
      const user = await userDao.Insert(new User(name, surname, login, password, UserRole.doctor), queryRunner);
      const { id: userId } = user;
      let { cabinet, specialisation } = doctor;
      const specialisationId = Object.values(specialisationEnum).indexOf(specialisation as string) + 1;
      const insertedDoctor = await doctorDao.InsertDoctor(new Doctor(cabinet, true, userId, null), queryRunner);
      const { id: doctorId } = insertedDoctor;
      await doctorSpecialisationDao.Insert(new DoctorSpecialisation(doctorId, specialisationId), queryRunner);
      return user;
    } catch (err) {
      throw err;
    }
  }
}
