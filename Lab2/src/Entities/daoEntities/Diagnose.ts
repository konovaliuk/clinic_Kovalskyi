export class Diagnose {
  private id: number;
  private appointment: number;
  private disease: string;
  private recommendations: string | null;
  private patient: number;
  constructor(diagnose: {
    id: number;
    appointment: number;
    disease: string;
    recommendations: string | null;
    patient: number;
  }) {
    const { id, appointment, disease, recommendations, patient } = diagnose;
    this.id = id;
    this.appointment = appointment;
    this.disease = disease;
    this.recommendations = recommendations;
    this.patient = patient;
  }
  get id_() {
    return this.id;
  }
  get appointment_() {
    return this.appointment;
  }
  get patient_() {
    return this.patient;
  }
  get disease_() {
    return this.disease;
  }
  get recommendations_() {
    return this.recommendations;
  }
  set appointment_(appointment) {
    this.appointment = appointment;
  }
  set patient_(patient) {
    this.patient = patient;
  }
  set disease_(disease) {
    this.disease = disease;
  }
  set recommendations_(recommendations) {
    this.recommendations = recommendations;
  }
}
