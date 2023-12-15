import { Router, Request, Response } from "express";
import { hashPassword, checkPassword } from "../hash";
import { pgClient } from "../pgClient";
import { isAdmin } from "../middleware";

declare module "express-session" {
  interface SessionData {
    username?: string;
    grant?: any;
    email?: string;
    isAdmin?: boolean;
  }
}

export const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/username", getUsername);

authRouter.get("/logout", logout);

authRouter.get("/user", isAdmin, async (req, res) => {
  let queryResult = await pgClient.query("SELECT * FROM USERS");
  res.json(queryResult.rows);
});

async function register(req: Request, res: Response) {
  console.log(req.body.email, req.body.passwordInput1);

  if (req.body.email == undefined || req.body.email == "") {
    res.status(400).json({ message: "Email can not be null" });
  } else if (
    req.body.passwordInput1 == undefined ||
    req.body.passwordInput1 == ""
  ) {
    res.status(400).json({ message: "Password can not be null" });
  } else if (
    req.body.passwordInput2 == undefined ||
    req.body.passwordInput2 == ""
  ) {
    res.status(400).json({ message: "Password verification can not be null" });
  } else if (req.body.passwordInput1 != req.body.passwordInput2) {
    res.status(400).json({ message: "Both passwords are not the same" });
  } else {
    // check username ? duplicate
    let queryResult = await pgClient.query(
      "SELECT username from users WHERE username = $1",
      [req.body.username]
    );
    if (queryResult.rowCount != 0) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      let checkEmail = await pgClient.query(
        `SELECT email FROM users WHERE email= $1`,
        [req.body.email]
      );
      if (checkEmail.rowCount != 0) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        let hashed = await hashPassword(req.body.passwordInput1);
        await pgClient.query(
          "INSERT INTO users (fullname,username,email,phonenumber,password) VALUES ($1,$2,$3,$4,$5)",
          [
            req.body.fullname,
            req.body.username,
            req.body.email,
            req.body.phonenumber,
            hashed,
          ]
        );
        res.json({ message: "Register success" });
      }
    }
  }
}

async function login(req: Request, res: Response) {
  // req.body.username ,find matching row from db,extract the hashed
  // use checkPassword  compare req.body.password with hashed
  // on return true,login success
  // on return false,login failed

  let queryResult = await pgClient.query(
    "SELECT username,password,isAdmin from users WHERE email = $1",
    [req.body.email]
  );

  if (queryResult.rowCount != 0) {
    console.log(queryResult.rows[0].password, queryResult.rows[0].username);

    let compareResult = await checkPassword({
      plainPassword: req.body.password,
      hashedPassword: queryResult.rows[0].password,
    });

    if (compareResult) {
      console.log(req.body.email);
      req.session["email"] = req.body.email;
      req.session["username"] = queryResult.rows[0].username;
      req.session["isAdmin"] = queryResult.rows[0].isadmin;

      console.log(req.session);

      res.json({ message: "login success" });
    } else {
      res.status(400).json({ message: "Password is incorrect" });
    }
  } else {
    res.status(400).json({ message: "Email is incorrect" });
  }
}

async function getUsername(req: Request, res: Response) {
  if (req.session.username)
    res.json({ message: "success", data: req.session.username });
  else res.status(400).json({ message: "you are not logged in" });
}

async function logout(req: Request, res: Response) {
  if (!req.session.username) {
    res.status(401).json({ message: "your are not logged in" });
  } else {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ message: "logout failed" });
      } else {
        res.json({ message: "logout success" });
      }
    });
  }
}
