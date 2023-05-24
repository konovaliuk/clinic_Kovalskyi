import { Disease } from "../Entities/Disease.js";
export interface DiseaseDAO {
  GetDiseases(): Promise<Disease[]>;
}
