import { Controller, Get, Res } from "@nestjs/common";
import { Request, Response } from "express";
@Controller("")
export class HomeController {
  @Get()
  render(@Res() res: Response) {
    res.render("home");
  }
}
