import { Command } from "./ICommand.js";
import { Request, Response } from "express";
import { MakeAppointmentService } from "../Services/makeAppointmentService.js";
import { specialisationEnum } from "../types/specialisation.js";
import { UserRole } from "../types/roles.js";
export class ListDoctorsCommand implements Command {
  async execute(req: Request, res: Response) {
    const { userId, role } = req.session;
    if (role !== UserRole.patient) return;
    const { specialisation } = req.query;
    if (!specialisation) return;
    const specialisationId = Object.values(specialisationEnum).indexOf(specialisation as string) + 1;
    if (!specialisationId) return;
    const service = new MakeAppointmentService();
    const doctorsList = await service.formDoctorsList(specialisationId);
    if (!doctorsList) return;
    const doctorsToView = service.getViewDoctors(doctorsList);
    res.render("doctorsList", { doctors: doctorsToView, path: req.originalUrl });
  }
}
