import { Appointment } from "../Entities/Appointment.js";
export interface AppointmentDAO {
  InsertAppointment(appointment: Appointment): Promise<void>;
  DeleteAppointment(id: number): Promise<void>;
  SetRate(appointmentID: number, rate: number): Promise<void>;
  GetUpcomingDoctorAppointments(doctorID: number): Promise<Appointment[]>;
  GetUpcomingPatientAppointments(patientID: number): Promise<Appointment[]>;
  GetAllPatientAppointments(patientID: number): Promise<Appointment[]>;
}
