import { Router } from "express";
import { pgClient } from "../pgClient";

export const cartRouter = Router();

cartRouter.get("/shopping_cart", async (req, res) => {
  let result = await pgClient.query(
    "SELECT * from shopping_cart join product_variant on product_variant_id = product_variant.id JOIN product on product_variant.product_id = product.id WHERE user_id = (SELECT id from users where email = $1)",
    [req.session.email]
  );
  res.json(result.rows);
});

cartRouter.get("/addToCart", async (req, res) => {
  console.log("check");
  let result = await pgClient.query(
    `SELECT * 
      from shopping_cart 
      join product_variant on product_variant_id = product_variant.id 
      JOIN product on product_variant.product_id = product.id 
      WHERE user_id = (SELECT id from users where email = $1)`,
    [req.session.email]
  );
  res.json(result.rows);
});
//<---APP.POST------------------------------------------------------------------------------------------------------------>

cartRouter.post("/addToCart", async (req, res) => {
  console.log(req.body.product_variant_id, req.session.email);
  await pgClient.query(
    `insert into shopping_cart (user_id, product_variant_id, quantity) VALUES ((SELECT id FROM users WHERE email = $1),$2,1)`,
    [req.session.email, req.body.product_variant_id]
  );
  res.json({ message: "added to shoppingCart" });
});
