import { Request, Response } from "express";
import { UserService } from "../Services/UserService.js";
import { Controller, Get, Res, Post, Req } from "@nestjs/common";
import { UserRole } from "../types/roles.js";
@Controller("login")
export class LoginController {
  constructor(private userService: UserService) {}
  @Get()
  render(@Res() res: Response) {
    res.render("login");
  }
  @Post()
  async login(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;
    let user;
    try {
      user = await this.userService.validateUser(username, password);
    } catch (err) {
      return res.render("error", { message: "Server problem" });
    }
    if (!user) return res.render("error", { message: "No such user" });
    const role = user.role;
    req.session.userId = user.id;
    req.session.role = role;
    switch (role) {
      case UserRole.patient:
        res.redirect("/patientCabinet");
        break;
      case UserRole.admin:
        res.redirect("/adminCabinet");
        break;
    }
  }
}
