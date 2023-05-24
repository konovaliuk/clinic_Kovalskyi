import { Command } from "./ICommand.js";
import { Request, Response } from "express";
import { PatientAppointmentListService } from "../Services/appointmentsListService.js";
import { PatientAppointmentDto } from "../Entities/dtoEntities/patientAppointment.js";
export class UpcomingPatientAppointmentsCommand implements Command {
  async execute(req: Request, res: Response) {
    const { userId, role } = req.session;
    if (userId) {
      const appointmentService = new PatientAppointmentListService();
      const appointmentsList = await appointmentService.formUpcomingAppointmenstList(userId);
      if (!appointmentsList) return;
      const appointmentsToView = appointmentService.getViewAppointments(appointmentsList);
      res.render("upcomingPatientAppointments", { appointments: appointmentsToView });
    }
  }
}
