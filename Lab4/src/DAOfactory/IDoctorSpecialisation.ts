import { DoctorSpecialisation } from "../Entities/daoEntities/DoctorSpecialisation.js";
import { QueryRunner } from "typeorm";
export interface DoctorSpecialisationDAO {
  GetByDoctor(doctorID: number): Promise<DoctorSpecialisation[]>;
  GetBySpecialisation(specialisationID: number): Promise<DoctorSpecialisation[]>;
  Insert(doctorSpecialisation: DoctorSpecialisation, queryRunner?: QueryRunner): Promise<void>;
}
