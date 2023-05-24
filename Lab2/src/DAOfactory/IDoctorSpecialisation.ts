import { DoctorSpecialisation } from "../Entities/daoEntities/DoctorSpecialisation.js";
export interface DoctorSpecialisationDAO {
  GetByDoctor(doctorID: number): Promise<DoctorSpecialisation[]>;
  GetBySpecialisation(specialisationID: number): Promise<DoctorSpecialisation[]>;
  Insert(doctorSpecialisation: DoctorSpecialisation): Promise<void>;
}
