import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthGuard } from "../../guards/authGuard.js";
import { UserRole } from "../../types/roles.js";
@Controller("patientCabinet")
@UseGuards(new AuthGuard(UserRole.patient))
export class PatientCabinetController {
  @Get()
  render(@Res() res: Response) {
    res.render("patientCabinet");
  }
}
