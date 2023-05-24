import { UserDAO } from "../DAOfactory/IUserDAO.js";
import { mysqlconnectionsPool } from "../mysql.js";
import { User } from "../Entities/daoEntities/User.js";

export class MySQLUserDAO implements UserDAO {
  private constructor() {}
  private static instance: MySQLUserDAO;
  public static getInstance(): MySQLUserDAO {
    if (!MySQLUserDAO.instance) {
      MySQLUserDAO.instance = new MySQLUserDAO();
    }
    return MySQLUserDAO.instance;
  }
  GetUserByLoginPassword(login: string, password: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        connection.execute(
          "SELECT * FROM user WHERE login = ? AND password = ?",
          [login, password],
          function (err, results) {
            connection.release();
            if (err) return reject(err);
            if (!results.length) return resolve(undefined);
            const user = new User(results[0]);
            resolve(user);
          }
        );
      });
    });
  }
  getUsersById(userIds: number[]): Promise<User[]> {
    return new Promise((resolve, reject) => {
      mysqlconnectionsPool.getConnection(function (err, connection) {
        if (err) return reject(err);
        let query = "SELECT * FROM user WHERE id IN (";
        for (let i = 0; i < userIds.length; i++) query += "?,";
        query = query.slice(0, -1);
        query += ")";
        connection.execute(query, userIds, function (err, results) {
          connection.release();
          if (err) return reject(err);

          let users: User[] = [];
          results.forEach((user) => {
            users.push(new User(user));
          });
          resolve(users);
        });
      });
    });
  }
}
