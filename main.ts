import express from "express";
import { Request, Response } from "express";
import { resolve } from "path";
import pg from "pg";

const app = express();
const port = 8080;
const yoClient = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

yoClient.connect();
//<---APP.USE--------------------------------------------------------------------------------------------------------->
// app.use(loggerMiddleware);
app.use(express.static("public/html/"));
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

//<---APP.GET--------------------------------------------------------------------------------------------------------->
app.get("/user", async (req, res) => {
  let queryResult = await yoClient.query("SELECT * FROM USER");
  res.json(queryResult.rows);
});
app.get("/product", (req, res) => {
  res.redirect("/product.html");
});

app.get("/about_us", (req, res) => {
  res.redirect("/about_us.html");
});
app.get("/login", (req, res) => {
  res.redirect("/login.html");
});

app.get("/register", (req, res) => {
  res.redirect("/register.html");
});

//<------------------------------------------------------------------------------------------------------------------>
app.post("/register", (req, res) => {
  console.log(req.body.Username);
  res.send(req.body.Username);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

//<----404----------------------------------------------------------------------------------------------------------->
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .sendFile(
      resolve(
        "/Users/EdgarChung/Documents/Coding/Project/c29-tw-grp2/public/html/404.html"
      )
    );
});
