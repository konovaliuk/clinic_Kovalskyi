export class Receipt {
  protected id: number;
  protected diagnose: number;
  protected medicine: string;
  protected dose: string | null;
  constructor(receipt: { id: number; diagnose: number; medicine: string; dose: string | null }) {
    const { id, diagnose, medicine, dose } = receipt;
    this.id = id;
    this.diagnose = diagnose;
    this.medicine = medicine;
    this.dose = dose;
  }
  get id_() {
    return this.id;
  }
  get diagnose_() {
    return this.diagnose;
  }
  get medicine_() {
    return this.medicine;
  }
  get dose_() {
    return this.dose;
  }
  set diagnose_(diagnose) {
    this.diagnose = diagnose;
  }
  set medicine_(medicine) {
    this.medicine = medicine;
  }
  set dose_(dose) {
    this.dose = dose;
  }
}
