import { Disease } from "../Entities/Disease.js";
import { mysqlconnectionsPool } from "../mysql.js";
export class MySQLDiseaseDAO {
  private constructor() {}
  private static instance: MySQLDiseaseDAO;
  public static getInstance(): MySQLDiseaseDAO {
    if (!MySQLDiseaseDAO.instance) {
      MySQLDiseaseDAO.instance = new MySQLDiseaseDAO();
    }
    return MySQLDiseaseDAO.instance;
  }
  GetDiseases(): Promise<Disease[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.execute(
          "SELECT * FROM disease",
          [],
          function (err, results) {
            connection.release();
            if (err) reject(err);
            const diseases: Disease[] = [];
            results.forEach((disease) => diseases.push(new Disease(disease)));
            resolve(diseases);
          }
        );
      });
    });
  }
}
