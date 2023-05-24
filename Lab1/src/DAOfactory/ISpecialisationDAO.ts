import { Specialisation } from "../Entities/Specialisation.js";
export interface SpecialisationDAO {
  GetSpecialisations(): Promise<Specialisation[]>;
}
