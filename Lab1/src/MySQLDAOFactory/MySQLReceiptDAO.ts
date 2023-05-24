import { ReceiptDAO } from "../DAOfactory/IReceiptDAO.js";
import { mysqlconnectionsPool } from "../mysql.js";
import { Receipt } from "../Entities/Receipt.js";

export class MySQLReceiptDAO implements ReceiptDAO {
  private constructor() {}
  private static instance: MySQLReceiptDAO;
  public static getInstance(): MySQLReceiptDAO {
    if (!MySQLReceiptDAO.instance) {
      MySQLReceiptDAO.instance = new MySQLReceiptDAO();
    }
    return MySQLReceiptDAO.instance;
  }
  InsertReceipt(receipt: Receipt): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "INSERT INTO receipt(diagnose, medicine, dose) VALUES (?, ?, ?)",
          [receipt.diagnose_, receipt.medicine_, receipt.dose_],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  DeleteReceipt(receiptID: number): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "DELETE FROM receipt WHERE id = ?",
          [receiptID],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
  GetReceiptByDiagnose(diagnoseIDs: number[]): Promise<Receipt[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        let query = "SELECT * FROM receipt WHERE diagnose IN (";
        for (let i = 0; i < diagnoseIDs.length; i++) query += "?,";
        query = query.slice(0, -1);
        query += ")";
        connection.execute(query, diagnoseIDs, function (err, results) {
          connection.release();
          if (err) reject(err);
          else if (results.length === 0) reject("Empty");
          let receipts: Receipt[] = [];
          results.forEach((element) => receipts.push(new Receipt(element)));
          resolve(receipts);
        });
      });
    });
  }
}
