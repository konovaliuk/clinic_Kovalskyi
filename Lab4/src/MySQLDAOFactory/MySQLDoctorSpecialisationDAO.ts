import { DoctorSpecialisationDAO } from "../DAOfactory/IDoctorSpecialisation.js";
import { DoctorSpecialisation } from "../Entities/daoEntities/DoctorSpecialisation.js";
import { QueryRunner } from "typeorm";
import { AppDataSource } from "../dataSource.js";
export class MySQLDoctorSpecialisationDAO implements DoctorSpecialisationDAO {
  private constructor() {}
  private static instance: MySQLDoctorSpecialisationDAO;
  public static getInstance(): MySQLDoctorSpecialisationDAO {
    if (!MySQLDoctorSpecialisationDAO.instance) {
      MySQLDoctorSpecialisationDAO.instance = new MySQLDoctorSpecialisationDAO();
    }
    return MySQLDoctorSpecialisationDAO.instance;
  }
  async GetByDoctor(doctorId: number): Promise<DoctorSpecialisation[]> {
    const repository = AppDataSource.getRepository(DoctorSpecialisation);
    const doctorSpecialisations = await repository.find({
      where: { doctor: doctorId },
    });
    return doctorSpecialisations;
  }

  async GetBySpecialisation(specialisationId: number): Promise<DoctorSpecialisation[]> {
    const repository = AppDataSource.getRepository(DoctorSpecialisation);
    const doctorSpecialisations = await repository.find({
      where: { specialisation: specialisationId },
    });
    return doctorSpecialisations;
  }

  async Insert(
    doctorSpecialisation: DoctorSpecialisation,
    queryRunner: QueryRunner = AppDataSource.createQueryRunner()
  ): Promise<void> {
    await queryRunner.manager.save(doctorSpecialisation);
  }
}
