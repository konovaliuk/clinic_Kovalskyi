import { Doctor } from "../Entities/daoEntities/Doctor.js";
export interface DoctorDAO {
  InsertDoctor(doctor: Doctor): Promise<void>;
  UpdateisWork(doctorID: number, isWork: boolean): Promise<void>;
  UpdateCabinet(doctorID: number, cabinet: number | null): Promise<void>;
  GetDoctorsByUsersIds(userIds: number[]): Promise<Doctor[]>;
  GetDoctorByID(ids: number[]): Promise<Doctor[]>;
}
