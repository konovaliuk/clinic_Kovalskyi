import { Command } from "./ICommand.js";
import { UserRole } from "../types/roles.js";
import { MySQLDAOFactory } from "../MySQLDAOFactory/MySQLDAOFactory.js";
import { Request, Response } from "express";
import { UserService } from "../Services/UserService.js";
export class LoginCommand implements Command {
  async execute(req: Request, res: Response) {
    const { username, password } = req.body;
    const userService = new UserService();
    const user = await userService.validateUser(username, password);
    if (!user) return res.render("error", { message: "No such user" });
    const role = user.role_;
    switch (role) {
      case UserRole.patient:
        req.session.userId = user.id_;
        req.session.role = role;
        res.redirect("/patientCabinet");
        break;
    }
  }
}
