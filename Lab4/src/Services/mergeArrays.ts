import { Appointment } from "../Entities/daoEntities/Appointment.js";
import { User } from "../Entities/daoEntities/User.js";
import { Diagnose } from "../Entities/daoEntities/Diagnose.js";
import { Receipt } from "../Entities/daoEntities/Receipt.js";
import { Doctor } from "../Entities/daoEntities/Doctor.js";
import { UserDoctor } from "../Entities/daoEntities/UserDoctor.js";
import { DiagnoseReceipts } from "../Entities/daoEntities/diagnoseReceipts.js";
import { AppointmentUserDoctor } from "../Entities/daoEntities/AppointmentUserDoctor.js";
export class MergeArraysService {
  mergeAppointmentsUD = (appointments: Appointment[], userDoctors: UserDoctor[]): AppointmentUserDoctor[] => {
    let mergedArray = appointments.reduce((acc: AppointmentUserDoctor[], appointment) => {
      const userDoctor = userDoctors.find((userDoctor) => {
        return userDoctor.doctor.id === appointment.doctor;
      });
      const { user, doctor } = userDoctor!;
      const appointmentUserDoctor = new AppointmentUserDoctor(appointment, user, doctor);
      acc.push(appointmentUserDoctor);
      return acc;
    }, []);
    return mergedArray;
  };
  mergeDiagnosesReceipts = (diagnoses: Diagnose[], receipts: Receipt[]): DiagnoseReceipts[] => {
    let mergedArray = diagnoses.reduce((acc: DiagnoseReceipts[], diagnose) => {
      const matchingReceipts = receipts.filter((receipt) => receipt.diagnose === diagnose.id);
      const diagnoseReceipts = new DiagnoseReceipts(diagnose, matchingReceipts);
      acc.push(diagnoseReceipts);
      return acc;
    }, []);
    return mergedArray;
  };
  mergeUsersDoctors = (users: User[], doctors: Doctor[]): UserDoctor[] => {
    let mergedArray = users.reduce((acc: UserDoctor[], user) => {
      const doctor = doctors.find((doctor) => doctor.userID === user.id);
      const userDoctor = new UserDoctor(user, doctor!);
      acc.push(userDoctor);
      return acc;
    }, []);
    return mergedArray;
  };
}
