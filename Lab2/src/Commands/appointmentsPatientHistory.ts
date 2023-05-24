import { Request, Response } from "express";
import { Command } from "./ICommand.js";
import { PatientAppointmentListService } from "../Services/appointmentsListService.js";
export class AppointmentsPatientHistoryCommand implements Command {
  async execute(req: Request, res: Response) {
    const appointmentService = new PatientAppointmentListService();
    const { userId, role } = req.session;
    if (userId) {
      const appointmentsList = await appointmentService.formPastAppointmentsList(userId);
      const appointmentsToView = appointmentService.getViewAppointments(appointmentsList);
      res.render("appointmentsPatientHistory", { appointments: appointmentsToView });
    }
  }
}
