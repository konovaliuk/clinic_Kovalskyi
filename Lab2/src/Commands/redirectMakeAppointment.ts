import { Command } from "./ICommand.js";
import { Request, Response } from "express";
import { MakeAppointmentService } from "../Services/makeAppointmentService.js";
export class RedirectMakeAppointmentCommand implements Command {
  async execute(req: Request, res: Response) {
    const { date, doctorId } = req.body;
    const service = new MakeAppointmentService();
    const doctorSchedule = await service.getDoctorSchedule(doctorId, date);
    res.render("makeAppointment", { date: date.slice(0, 10), doctorId, doctorSchedule, path: req.originalUrl });
  }
}
