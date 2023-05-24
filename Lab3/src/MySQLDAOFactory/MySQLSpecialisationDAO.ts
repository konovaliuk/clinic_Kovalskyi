import { SpecialisationDAO } from "../DAOfactory/ISpecialisationDAO.js";
import { AppDataSource } from "../dataSource.js";

import { Specialisation } from "../Entities/daoEntities/Specialisation.js";
export class MySQLSpecialisationDAO implements SpecialisationDAO {
  private constructor() {}
  private static instance: MySQLSpecialisationDAO;
  public static getInstance(): MySQLSpecialisationDAO {
    if (!MySQLSpecialisationDAO.instance) {
      MySQLSpecialisationDAO.instance = new MySQLSpecialisationDAO();
    }
    return MySQLSpecialisationDAO.instance;
  }
  async GetSpecialisations(): Promise<Specialisation[]> {
    const repository = AppDataSource.getRepository(Specialisation);
    const specialisations = await repository.find();
    return specialisations;
  }
}
