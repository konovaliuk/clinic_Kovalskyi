import { User } from "../Entities/daoEntities/User.js";
export interface UserDAO {
  GetUserByLoginPassword(login: string, password: string): Promise<User | undefined>;
  //ChangePassword(password: string, adminID: number): Promise<void>;
  getUsersById(usersId: number[]): Promise<User[]>;
}
