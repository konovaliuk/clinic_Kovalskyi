import { Command } from "./ICommand.js";
import { Request, Response } from "express";
export class RenderPatientCabinetCommand implements Command {
  execute(req: Request, res: Response): void {
    res.render("patientCabinet");
  }
}
