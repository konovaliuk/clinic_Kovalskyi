import express from "express";
import { Request, Response } from "express";
import "dotenv/config.js";
import { ControllerHelper } from "./ControllerHelper.js";
import bodyParser from "body-parser";
import session from "express-session";
import { getAction } from "./getAction.js";
import "reflect-metadata";
interface MySessionData {
  userId?: number;
  command?: string | undefined;
  role?: number;
}
declare module "express-session" {
  interface SessionData extends MySessionData {}
}
const { SESSION_SECRET } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(
  session({
    secret: SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);
const PORT = process.env.servletPort;
const service = (req: Request, res: Response): void => {
  const { method } = req;
  let action: string;
  if (method === "POST") action = req.body.command;
  else {
    const { path } = req;
    action = getAction(path);
    console.log(path);
  }
  const command = ControllerHelper.getInstance().getCommand(action);
  command.execute(req, res);
};

app.all("*", (req, res) => {
  service(req, res);
});

app.listen(PORT);
