import { ReceiptDAO } from "../DAOfactory/IReceiptDAO.js";
import { AppDataSource } from "../dataSource.js";
import { Receipt } from "../Entities/daoEntities/Receipt.js";

export class MySQLReceiptDAO implements ReceiptDAO {
  private constructor() {}
  private static instance: MySQLReceiptDAO;
  public static getInstance(): MySQLReceiptDAO {
    if (!MySQLReceiptDAO.instance) {
      MySQLReceiptDAO.instance = new MySQLReceiptDAO();
    }
    return MySQLReceiptDAO.instance;
  }
  async InsertReceipt(receipt: Receipt): Promise<void> {
    const repository = AppDataSource.getRepository(Receipt);
    await repository.save(receipt);
  }

  async GetReceiptByDiagnose(diagnoseIds: number[]): Promise<Receipt[]> {
    const repository = AppDataSource.getRepository(Receipt);
    const diagnoses = await repository
      .createQueryBuilder("receipt")
      .where("receipt.diagnose IN (:...diagnoseIds)", { diagnoseIds })
      .getMany();
    return diagnoses;
  }
}
