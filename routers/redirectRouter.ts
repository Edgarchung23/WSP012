import { Router } from "express";

export const redirectRouter = Router();

redirectRouter.get("/about_us", (req, res) => {
  res.redirect("/about_us.html");
});

redirectRouter.get("/login", async (req, res) => {
  res.redirect("/login.html");
});

redirectRouter.get("/register", (req, res) => {
  res.redirect("/register.html");
});
