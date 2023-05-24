import { Request, Response } from "express";
import { MakeAppointmentService } from "../../Services/makeAppointmentService.js";
import { Controller, Get, Res, Req, Post, UseGuards } from "@nestjs/common";
import { specialisationEnum } from "../../types/specialisation.js";
import { UserRole } from "../../types/roles.js";

import { AuthGuard } from "../../guards/authGuard.js";
@Controller("patientCabinet/chooseSpecialisation")
@UseGuards(new AuthGuard(UserRole.patient))
export class MakeAppointmentController {
  constructor(private makeAppointmentSerice: MakeAppointmentService) {}

  @Get()
  specialisations(@Res() res: Response, @Req() req: Request) {
    const specialisations = Object.values(specialisationEnum);
    res.render("chooseSpecialisation", { specialisations });
  }

  @Get("listDoctors")
  async doctors(@Res() res: Response, @Req() req: Request) {
    const { specialisation } = req.query;
    if (!specialisation) return;
    const specialisationId = Object.values(specialisationEnum).indexOf(specialisation as string) + 1;
    if (!specialisationId) return;
    try {
      const doctorsList = await this.makeAppointmentSerice.formDoctorsList(specialisationId);
      if (!doctorsList) return;
      const doctorsToView = this.makeAppointmentSerice.getViewDoctors(doctorsList);
      res.render("doctorsList", { doctors: doctorsToView });
    } catch (err) {
      return res.render("errorWhenLogged", { message: "Server problem" });
    }
  }

  @Post("listDoctors/schedule")
  async schedule(@Res() res: Response, @Req() req: Request) {
    const calendar = this.makeAppointmentSerice.getCalendar();
    const { doctorId } = req.body;
    const firstDay = calendar[0].date.getDay();
    res.render("calendar", {
      calendar,
      doctorId,
      week: this.makeAppointmentSerice.getCalendarWeek(firstDay),
      path: req.originalUrl,
    });
  }

  @Post("listDoctors/schedule/chooseTime")
  async chooseTime(@Res() res: Response, @Req() req: Request) {
    const { date, doctorId } = req.body;
    try {
      const doctorSchedule = await this.makeAppointmentSerice.getDoctorSchedule(doctorId, date);
      res.render("makeAppointment", { date: date.slice(0, 10), doctorId, doctorSchedule, path: req.originalUrl });
    } catch {
      return res.render("errorWhenLogged", { message: "Server problem" });
    }
  }

  @Post("listDoctors/schedule/chooseTime/makeAppointment")
  async makeAppointment(@Res() res: Response, @Req() req: Request) {
    const { doctorId, date } = req.body;
    const { userId } = req.session;
    try {
      await this.makeAppointmentSerice.makeAppointment(doctorId, date, userId!);
      res.redirect("/patientCabinet");
    } catch (err) {
      return res.render("errorWhenLogged", { message: "Server problem" });
    }
  }
}
