import { Doctor } from "../Entities/daoEntities/Doctor.js";
import { QueryRunner } from "typeorm";
export interface DoctorDAO {
  InsertDoctor(doctor: Doctor, queryRunner: QueryRunner): Promise<void>;
  UpdateisWork(doctorID: number, isWork: boolean): Promise<void>;
  UpdateCabinet(doctorID: number, cabinet: number | null): Promise<void>;
  GetDoctorsByUsersIds(userIds: number[]): Promise<Doctor[]>;
  GetDoctorByID(ids: number[]): Promise<Doctor[]>;
}
