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
    console.log("you are authorized");
    next();
  } else {
    console.log("you are not authorized");

    res.status(401).json({ message: "you have to log in" });
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session["isAdmin"] == true) {
    next();
  } else {
    res.status(401).json({ message: "you are not admin" });
  }
}
