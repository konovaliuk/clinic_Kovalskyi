import { Request, Response } from "express";

import { Command } from "./ICommand.js";
export class HomeCommand implements Command {
  execute(req: Request, res: Response): void {
    res.render("home");
  }
}
