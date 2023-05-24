import { Request, Response } from "express";
import { Command } from "./ICommand.js";
import { MakeAppointmentService } from "../Services/makeAppointmentService.js";
import { RenderPatientCabinetCommand } from "./redirectPatientCabinet.js";
export class MakeAppointmentCommand implements Command {
  async execute(req: Request, res: Response) {
    const { doctorId, date } = req.body;
    const { userId } = req.session;
    if (!userId) return;
    const serivce = new MakeAppointmentService();
    await serivce.makeAppointment(doctorId, date, userId);
    res.redirect("/patientCabinet");
  }
}
