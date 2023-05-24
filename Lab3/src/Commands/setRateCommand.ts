import { Command } from "./ICommand.js";
import { Request, Response } from "express";
import { PatientAppointmentListService } from "../Services/appointmentsListService.js";
import { DetailPatientAppointmentCommand } from "./detailPatientAppointment.js";
export class SetRateCommand implements Command {
  async execute(req: Request, res: Response) {
    const { rate, appointmentId } = req.body;
    const service = new PatientAppointmentListService();
    await service.setRate(appointmentId, rate);
    const command = new DetailPatientAppointmentCommand();
    command.execute(req, res);
  }
}
