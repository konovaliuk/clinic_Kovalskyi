import { Specialisation } from "../Entities/daoEntities/Specialisation.js";
export interface SpecialisationDAO {
  GetSpecialisations(): Promise<Specialisation[]>;
}
