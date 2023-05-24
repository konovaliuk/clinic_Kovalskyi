import { Command } from "./ICommand.js";
import { Request, Response } from "express";

export class SignUpCommand implements Command {
  execute(req: Request, res: Response): void {}
}
