import { NextFunction, Request, Response } from "express";
declare module "express-session" {
  interface SessionData {
    username?: string;
    grant?: any;
    email?: string;
    isAdmin?: boolean;
  }
}
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.session["username"]) {
    next();
  } else {
    res.redirect("/");
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session["isAdmin"] == true) {
    next();
  } else {
    res.redirect("/");
  }
}
