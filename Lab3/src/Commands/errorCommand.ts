import { Command } from "./ICommand.js";
import { Request, Response } from "express";
export class ErrorCommand implements Command {
  execute(req: Request, res: Response) {
    res.render("error", { message: "This route is not available" });
  }
}
