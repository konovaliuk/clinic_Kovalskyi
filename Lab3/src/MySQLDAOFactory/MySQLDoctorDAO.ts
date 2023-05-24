import { DoctorDAO } from "../DAOfactory/IDoctorDAO.js";
import { Doctor } from "../Entities/daoEntities/Doctor.js";
import { AppDataSource } from "../dataSource.js";
import { QueryRunner } from "typeorm";
export class MySQLDoctorDAO implements DoctorDAO {
  private constructor() {}
  private static instance: MySQLDoctorDAO;
  public static getInstance(): MySQLDoctorDAO {
    if (!MySQLDoctorDAO.instance) {
      MySQLDoctorDAO.instance = new MySQLDoctorDAO();
    }
    return MySQLDoctorDAO.instance;
  }
  async InsertDoctor(doctor: Doctor, queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(doctor);
  }

  async UpdateisWork(doctorID: number, isWork: boolean): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .update(Doctor)
      .set({ isWork: isWork })
      .where("id = :doctorID", { doctorID })
      .execute();
  }
  async UpdateCabinet(doctorID: number, cabinet: number | null): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .update(Doctor)
      .set({ cabinet: cabinet })
      .where("id = :doctorID", { doctorID })
      .execute();
  }

  async GetDoctorsByUsersIds(userIds: number[]): Promise<Doctor[]> {
    const doctorRepository = AppDataSource.getRepository(Doctor);
    const doctors = await doctorRepository
      .createQueryBuilder("doctor")
      .where("doctor.userId IN (:...userIds)", { userIds })
      .getMany();
    return doctors;
  }

  async GetDoctorByID(ids: number[]): Promise<Doctor[]> {
    const doctorRepository = AppDataSource.getRepository(Doctor);
    const doctors = await doctorRepository
      .createQueryBuilder("doctor")
      .where("doctor.id IN (:...ids)", { ids })
      .getMany();
    return doctors;
  }
}
