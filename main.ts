import express from "express";
// import { Request, Response } from "express";
// import { resolve } from "path";
// import { loggerMiddleware, uploadFile } from "./middleware";
// import expressSession from "express-session";
// import jsonfile from "jsonfile";
// import { isLoggedIn } from "./middleware";
// import { loginCheck } from "./Login";
const app = express();
const port = 8080;
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to WSP012");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
