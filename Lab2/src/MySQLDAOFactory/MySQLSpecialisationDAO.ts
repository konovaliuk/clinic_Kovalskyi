import { SpecialisationDAO } from "../DAOfactory/ISpecialisationDAO.js";
import { mysqlconnectionsPool } from "../mysql.js";

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
  GetSpecialisations(): Promise<Specialisation[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute("SELECT * FROM specialisation", [], function (err, results) {
          connection.release();
          if (err) return reject(err);
          let specialisations: Specialisation[] = [];
          results.forEach((specialisation) => specialisations.push(new Specialisation(specialisation)));
          resolve(specialisations);
        });
      });
    });
  }
}
