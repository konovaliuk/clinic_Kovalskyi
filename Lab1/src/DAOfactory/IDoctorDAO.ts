import { Doctor } from "../Entities/Doctor.js";
export interface DoctorDAO {
  InsertDoctor(doctor: Doctor): Promise<void>;
  UpdateisWork(login: string, isWork: boolean): Promise<void>;
  UpdateCabinet(doctorLogin: string, cabinet: number | null): Promise<void>;
  GetDoctorByLogin(login: string): Promise<Doctor>;
  GetDoctorByID(ids: number[]): Promise<Doctor[]>;
}
