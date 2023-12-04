import express from "express";
import { Request, Response } from "express";
import { resolve } from "path";
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

app.get("/product", (req, res) => {
  res.redirect("/product.html");
});

app.get("/aboutus", (req, res) => {
  res.redirect("/aboutus.html");
});
app.get("/login", (req, res) => {
  res.redirect("/login.html");
});

app.get("/register", (req, res) => {
  res.redirect("/register.html");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

//<----------------------404--------------------------------------------------------->
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .sendFile(
      resolve(
        "/Users/EdgarChung/Documents/Coding/Project/c29-tw-grp2/public/html/404.html"
      )
    );
});
