import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";

import { UserRole } from "../../types/roles.js";
import { AuthGuard } from "../../guards/authGuard.js";
@Controller("adminCabinet")
@UseGuards(new AuthGuard(UserRole.admin))
export class AdminCabinetController {
  @Get()
  render(@Res() res: Response) {
    res.render("adminCabinet");
  }
}
