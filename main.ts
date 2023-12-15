import express from "express";
import { Request, Response } from "express";
import { resolve } from "path";
import { pgClient } from "./pgClient";
import expressSession from "express-session";
import { redirectRouter } from "./routers/redirectRouter";
import { authRouter } from "./routers/authRouter";
import { productRouter } from "./routers/productRouter";
import { cartRouter } from "./routers/cartRouter";

export type UserListType = Array<{ username: string; password: string }>;

//<-------------------------------------------------------------------------------------------------------------------->
const app = express();
const port = 8080;

pgClient.connect();
//<-------------------------------------------------------------------------------------------------------------------->

//<---APP.USE--------------------------------------------------------------------------------------------------------->
// app.use(loggerMiddleware);
app.use(express.static("public/html/"));
app.use(express.static("public/image"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);

//<---APP.GET--------------------------------------------------------------------------------------------------------->
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(redirectRouter);
app.use(authRouter);
app.use(productRouter);
app.use(cartRouter);
//<----404----------------------------------------------------------------------------------------------------------->
app.use((req: Request, res: Response) => {
  res.status(404).sendFile(resolve("public/html/404.html"));
});

//<------------------------------------------------------------------------------------------------------------------>
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
