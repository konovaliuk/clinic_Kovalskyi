import { mysqlconnectionsPool } from "../mysql.js";
import { AdminDAO } from "../DAOfactory/IAdminDAO.js";
import { Admin } from "../Entities/Admin.js";
export class MySQLAdminDAO implements AdminDAO {
  private constructor() {}
  private static instance: MySQLAdminDAO;
  public static getInstance(): MySQLAdminDAO {
    if (!MySQLAdminDAO.instance) {
      MySQLAdminDAO.instance = new MySQLAdminDAO();
    }
    return MySQLAdminDAO.instance;
  }
  ChangePassword(password: string, adminID: number): Promise<void> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "UPDATE admin SET password = ? WHERE id = ?",
          [password, adminID],
          function (err, results) {
            connection.release();
            return err ? reject(err) : resolve();
          }
        );
      });
    });
  }
}
