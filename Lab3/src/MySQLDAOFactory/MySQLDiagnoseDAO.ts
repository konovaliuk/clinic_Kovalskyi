import { DiagnoseDAO } from "../DAOfactory/IDiagnoseDAO.js";
import { Diagnose } from "../Entities/daoEntities/Diagnose.js";
import { MoreThan, LessThan } from "typeorm";
import { AppDataSource } from "../dataSource.js";
export class MySQLDiagnoseDAO implements DiagnoseDAO {
  private constructor() {}
  private static instance: MySQLDiagnoseDAO;
  public static getInstance(): MySQLDiagnoseDAO {
    if (!MySQLDiagnoseDAO.instance) {
      MySQLDiagnoseDAO.instance = new MySQLDiagnoseDAO();
    }
    return MySQLDiagnoseDAO.instance;
  }

  async InsertDiagnose(diagnose: Diagnose): Promise<void> {
    const repository = AppDataSource.getRepository(Diagnose);
    await repository.save(diagnose);
  }
  async getDiagnosesByAppointment(appointmentId: number): Promise<Diagnose[]> {
    const repository = AppDataSource.getRepository(Diagnose);
    const appointments = await repository.find({
      where: { appointment: appointmentId },
    });
    return appointments;
  }
}
