export class Doctor {
  private id: number;
  private userID: number;
  private cabinet: number | null;
  private isWork: boolean;
  private averageRate: number | null;
  constructor(doctor: {
    id: number;
    cabinet: number | null;
    isWork: boolean;
    userID: number;
    averageRate: number | null;
  }) {
    const { id, cabinet, isWork, userID, averageRate } = doctor;
    this.id = id;
    this.userID = userID;
    this.cabinet = cabinet;
    this.isWork = isWork;
    this.averageRate = averageRate;
  }
  get averageRate_() {
    return this.averageRate;
  }
  get cabinet_() {
    return this.cabinet;
  }
  get isWork_() {
    return this.isWork;
  }
  get userID_() {
    return this.userID;
  }
  set cabinet_(cabinet) {
    this.cabinet = cabinet;
  }
  set isWork_(isWork: boolean) {
    this.isWork = isWork;
  }
}
