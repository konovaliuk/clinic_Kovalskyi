import { Command } from "./ICommand.js";
import { Request, Response } from "express";
import { MakeAppointmentService } from "../Services/makeAppointmentService.js";
export class RenderScheduleCommand implements Command {
  execute(req: Request, res: Response): void {
    const service = new MakeAppointmentService();
    const calendar = service.getCalendar();
    const { doctorId } = req.body;
    const firstDay = calendar[0].date.getDay();
    res.render("calendar", { calendar, doctorId, week: service.getCalendarWeek(firstDay), path: req.originalUrl });
  }
}
