import { Request, Response } from "express";
export interface Command {
  execute(req: Request, res: Response): void;
}
