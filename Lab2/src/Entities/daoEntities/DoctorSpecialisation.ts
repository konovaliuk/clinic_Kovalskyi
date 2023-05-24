export class DoctorSpecialisation {
  private id: number;
  private doctor: number;
  private specialisation: number;
  constructor(doctorSpecialisation: { id: number; doctor: number; specialisation: number }) {
    const { id, doctor, specialisation } = doctorSpecialisation;
    this.id = id;
    this.doctor = doctor;
    this.specialisation = specialisation;
  }
  get id_() {
    return this.id;
  }
  get doctor_() {
    return this.doctor;
  }
  get specialisation_() {
    return this.specialisation;
  }
  set doctor_(doctor: number) {
    this.doctor = doctor;
  }
  set specialisation_(specialisation: number) {
    this.specialisation = specialisation;
  }
}
