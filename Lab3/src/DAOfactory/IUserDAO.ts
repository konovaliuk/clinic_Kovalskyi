import { User } from "../Entities/daoEntities/User.js";
import { QueryRunner } from "typeorm";
export interface UserDAO {
  GetUserByLoginPassword(login: string, password: string): Promise<User | null>;
  //ChangePassword(password: string, adminID: number): Promise<void>;
  getUsersById(usersId: number[]): Promise<User[]>;
  Insert(user: User, queryRunner: QueryRunner): Promise<User>;
}
