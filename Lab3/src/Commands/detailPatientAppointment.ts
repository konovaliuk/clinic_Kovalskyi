import { Command } from "./ICommand.js";
import { Request, Response } from "express";
import { DiagnoseService } from "../Services/diagnoseService.js";
export class DetailPatientAppointmentCommand implements Command {
  async execute(req: Request, res: Response) {
    const { appointmentId } = req.body;
    if (!appointmentId) return;
    const service = new DiagnoseService();
    const diagnosesList = await service.formDiagnosesList(appointmentId);
    const diagnosesToView = service.getViewDiagnoses(diagnosesList);
    res.render("detailedPatientAppointment", { diagnoses: diagnosesToView, appointmentId });
  }
}
