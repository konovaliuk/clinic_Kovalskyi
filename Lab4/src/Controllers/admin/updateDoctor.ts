import { Controller, Get, Res, UseGuards, Post, Req, Query } from "@nestjs/common";
import { Request, Response } from "express";
import { UserRole } from "../../types/roles.js";
import { AuthGuard } from "../../guards/authGuard.js";
import { specialisationEnum } from "../../types/specialisation.js";
import { UserService } from "../../Services/UserService.js";
import { signUpErrorHandler } from "../../errorHandlers.js";
import { MakeAppointmentService } from "../../Services/makeAppointmentService.js";
@Controller("adminCabinet/chooseSpecialisation")
@UseGuards(new AuthGuard(UserRole.admin))
export class UpdateDoctorController {
  constructor(private makeAppointmentSerice: MakeAppointmentService, private userService: UserService) {}
  @Get()
  render(@Res() res: Response) {
    const specialisations = Object.values(specialisationEnum).filter((value) => typeof value === "string");
    res.render("adminChooseSpecialisation", { specialisations });
  }

  @Get("listDoctors")
  async doctors(@Query("specialisation") specialisation: string, @Res() res: Response, @Req() req: Request) {
    if (!specialisation) return;
    const specialisationId = Object.values(specialisationEnum).indexOf(specialisation as string) + 1;
    console.log(specialisationId);
    if (!specialisationId) return;
    try {
      const doctorsList = await this.makeAppointmentSerice.formDoctorsList(specialisationId);
      if (!doctorsList) return;
      const doctorsToView = this.makeAppointmentSerice.getViewDoctors(doctorsList);
      res.render("adminDoctorsList", { doctors: doctorsToView });
    } catch (err) {
      return res.render("errorWhenLogged", { message: "Server problem" });
    }
  }
  @Post("listDoctors/isWork")
  async renderIsWork(@Res() res: Response, @Req() req: Request) {
    const { doctorId } = req.body;
    res.render("isWork", { doctorId });
  }

  @Post("listDoctors/isWork/update")
  async updateDoctor(@Res() res: Response, @Req() req: Request) {
    const { doctorId, isWork } = req.body;
    try {
      const flag = isWork === "true" ? true : false;
      await this.userService.updateDoctor(doctorId, flag);
      return res.render("adminCabinet");
    } catch (err) {
      return res.render("errorWhenLogged", { message: "Server problem" });
    }
  }
}
