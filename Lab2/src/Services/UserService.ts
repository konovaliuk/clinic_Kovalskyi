import { MySQLDAOFactory } from "../MySQLDAOFactory/MySQLDAOFactory.js";
import { User } from "../Entities/daoEntities/User.js";
export class UserService {
  async validateUser(login: string, password: string): Promise<User | undefined> {
    const daoFactory = MySQLDAOFactory.getInstance();
    const userDao = daoFactory.GetUserDAO();
    let user;
    try {
      user = await userDao.GetUserByLoginPassword(login, password);
    } catch (err) {
      throw err;
    }
    return user;
  }
}
