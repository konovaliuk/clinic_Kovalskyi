import { PatientAppointmentListService } from "../../Services/appointmentsListService.js";
import { Controller, Get, Res, Post, Req, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { DiagnoseService } from "../../Services/diagnoseService.js";
import { AuthGuard } from "../../guards/authGuard.js";
import { UserRole } from "../../types/roles.js";
@Controller("patientCabinet/appointmentsHistory")
@UseGuards(new AuthGuard(UserRole.patient))
export class AppointmentsPatientHistoryController {
  constructor(private appointmentService: PatientAppointmentListService, private diagnoseService: DiagnoseService) {}

  @Get()
  async appointmentsHistory(@Res() res: Response, @Req() req: Request) {
    const { userId, role } = req.session;
    let appointmentsList;
    try {
      appointmentsList = await this.appointmentService.formPastAppointmentsList(userId!);
    } catch (err) {
      return res.render("errorWhenLogged", { message: "Server problem" });
    }
    const appointmentsToView = this.appointmentService.getViewAppointments(appointmentsList);
    res.render("appointmentsPatientHistory", {
      appointments: appointmentsToView,
    });
  }

  @Post("viewAppointment/setRate")
  async setRate(@Res() res: Response, @Req() req: Request) {
    const { rate, appointmentId } = req.body;
    try {
      await this.appointmentService.setRate(appointmentId, rate);
    } catch (err) {
      return res.render("errorWhenLogged", { message: "Server problem" });
    }
    this.detailAppointment(res, req);
  }

  @Post("viewAppointment")
  async detailAppointment(@Res() res: Response, @Req() req: Request) {
    const { appointmentId } = req.body;
    if (!appointmentId) return;
    let diagnosesList;
    try {
      diagnosesList = await this.diagnoseService.formDiagnosesList(appointmentId);
    } catch (err) {
      return res.render("errorWhenLogged", { message: "Server problem" });
    }
    const diagnosesToView = this.diagnoseService.getViewDiagnoses(diagnosesList);
    res.render("detailedPatientAppointment", {
      diagnoses: diagnosesToView,
      appointmentId,
    });
  }
}
