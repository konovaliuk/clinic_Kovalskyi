import { Controller, Get, Res, UseGuards, Post, Req } from "@nestjs/common";
import { Request, Response } from "express";
import { UserRole } from "../../types/roles.js";
import { AuthGuard } from "../../guards/authGuard.js";
import { specialisationEnum } from "../../types/specialisation.js";
import { UserService } from "../../Services/UserService.js";
import { signUpErrorHandler } from "../../errorHandlers.js";
@Controller("adminCabinet/addDoctor")
@UseGuards(new AuthGuard(UserRole.admin))
export class AddDoctorController {
  constructor(private userSerice: UserService) {}
  @Get()
  render(@Res() res: Response) {
    const specialisations = Object.values(specialisationEnum).filter((value) => typeof value === "string");
    res.render("addDoctor", { specialisations });
  }
  @Post()
  async addDoctor(@Res() res: Response, @Req() req: Request) {
    const { name, surname, password, login, cabinet, specialisation } = req.body;
    await this.userSerice.insertDoctor(name, surname, password, login, cabinet, specialisation).catch((err) => {
      console.log(err);
      const message = signUpErrorHandler(err);
      return res.render("adminErrorWhenLogged", { message });
    });
    res.redirect("/adminCabinet");
  }
}
