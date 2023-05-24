export class Appointment {
  private id: number;
  private doctor: number;
  private patient: number;
  private date: string;
  private rate: number | null;
  constructor(appointment: { id: number; doctor: number; patient: number; date: string; rate: number | null }) {
    const { id, doctor, patient, date, rate } = appointment;
    this.id = id;
    this.doctor = doctor;
    this.patient = patient;
    this.date = date;
    this.rate = rate;
  }
  get id_() {
    return this.id;
  }
  get doctor_() {
    return this.doctor;
  }
  get patient_() {
    return this.patient;
  }
  get date_() {
    return this.date;
  }
  get rate_() {
    return this.rate;
  }
  set doctor_(doctor) {
    this.doctor = doctor;
  }
  set patient_(patient) {
    this.patient = patient;
  }
  set date_(date) {
    this.date = date;
  }
  set rate_(rate) {
    this.rate = rate;
  }
}
