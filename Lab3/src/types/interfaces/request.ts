import { SessionData } from "express-session";

declare module "express" {
  export interface Request {
    session: SessionData & { command?: string | undefined; userId?: number; role?: number };
  }
}
