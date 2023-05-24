import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import express from "express";
import "dotenv/config.js";
import bodyParser from "body-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import session from "express-session";
const PORT = process.env.servletPort;
interface MySessionData {
  userId?: number;
  command?: string | undefined;
  role?: number;
}
declare module "express-session" {
  interface SessionData extends MySessionData {}
}
const { SESSION_SECRET } = process.env;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  await app.listen(PORT!);
}
bootstrap();
