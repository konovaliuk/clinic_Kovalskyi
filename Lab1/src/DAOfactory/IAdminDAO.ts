import { Admin } from "../Entities/Admin.js";
export interface AdminDAO {
  ChangePassword(password: string, adminID: number): Promise<void>;
}
