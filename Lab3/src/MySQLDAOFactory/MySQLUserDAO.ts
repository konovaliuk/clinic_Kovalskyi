import { UserDAO } from "../DAOfactory/IUserDAO.js";
import { AppDataSource } from "../dataSource.js";
import { User } from "../Entities/daoEntities/User.js";
import { QueryRunner } from "typeorm";
export class MySQLUserDAO implements UserDAO {
  private constructor() {}
  private static instance: MySQLUserDAO;

  public static getInstance(): MySQLUserDAO {
    if (!MySQLUserDAO.instance) {
      MySQLUserDAO.instance = new MySQLUserDAO();
    }
    return MySQLUserDAO.instance;
  }

  async Insert(user: User, queryRunner: QueryRunner): Promise<User> {
    return await queryRunner.manager.save(user);
  }

  async GetUserByLoginPassword(login: string, password: string): Promise<User | null> {
    const repository = AppDataSource.getRepository(User);
    const users = await repository.findOne({ where: { login: login, password: password } });
    return users;
  }
  async getUsersById(userIds: number[]): Promise<User[]> {
    const repository = AppDataSource.getRepository(User);
    const users = await repository.createQueryBuilder("user").where("user.id IN (:...userIds)", { userIds }).getMany();
    return users;
  }
}
