import { Command } from "./ICommand.js";
import { Request, Response } from "express";
export class RedirectLoginCommand implements Command {
  execute(req: Request, res: Response): void {
    res.render("login");
  }
}
