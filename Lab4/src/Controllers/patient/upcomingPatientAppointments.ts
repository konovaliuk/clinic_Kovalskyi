import { Request, Response } from "express";
import { PatientAppointmentListService } from "../../Services/appointmentsListService.js";
import { PatientAppointmentDto } from "../../Entities/dtoEntities/patientAppointment.js";
import { Controller, Get, Res, Req, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../../guards/authGuard.js";
import { UserRole } from "../../types/roles.js";
@Controller("patientCabinet/upcomingAppointments")
@UseGuards(new AuthGuard(UserRole.patient))
export class UpcomingPatientAppointmentsController {
  constructor(private appointmentService: PatientAppointmentListService) {}
  @Get()
  async render(@Res() res: Response, @Req() req: Request) {
    const { userId, role } = req.session;
    let appointmentsList;
    try {
      appointmentsList = await this.appointmentService.formUpcomingAppointmenstList(userId!);
    } catch (err) {
      return res.render("errorWhenLogged", { message: "Server problem" });
    }
    const appointmentsToView = this.appointmentService.getViewAppointments(appointmentsList);
    res.render("upcomingPatientAppointments", {
      appointments: appointmentsToView,
    });
  }
}
