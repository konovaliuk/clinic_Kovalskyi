import { Controller, Get, Res, Post, Req } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "../Services/UserService.js";
import { signUpErrorHandler } from "../errorHandlers.js";
@Controller("signUp")
export class SignUpController {
  constructor(private userService: UserService) {}
  @Get()
  render(@Res() res: Response) {
    res.render("signUp");
  }

  @Post()
  async signUp(@Res() res: Response, @Req() req: Request) {
    const { name, surname, login, password } = req.body;
    try {
      const user = await this.userService.insertUser(name, surname, password, login);
      req.session.userId = user.id;
      req.session.role = user.role;
      res.redirect("/patientCabinet");
    } catch (err) {
      const message = signUpErrorHandler(err);
      return res.render("error", { message });
    }
  }
}
