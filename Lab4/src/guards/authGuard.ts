import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request, Response } from "express";
import { UserRole } from "../types/roles.js";
@Injectable()
export class AuthGuard implements CanActivate {
  private role: UserRole;
  constructor(role: UserRole) {
    this.role = role;
  }
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const role = req.session?.role;
    const userId = req.session?.userId;
    const isAuthenticated = role === this.role && !!userId;
    return isAuthenticated;
  }
}
