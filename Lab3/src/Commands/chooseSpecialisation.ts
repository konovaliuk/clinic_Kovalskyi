import { Command } from "./ICommand.js";
import { Request, Response } from "express";
import { specialisationEnum } from "../types/specialisation.js";
export class ChooseSpecialisationCommand implements Command {
  async execute(req: Request, res: Response) {
    const { userId, role } = req.session;
    if (!userId) return;
    const specialisations = Object.values(specialisationEnum);
    res.render("chooseSpecialisation", { specialisations });
  }
}
