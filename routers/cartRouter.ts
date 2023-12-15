import { Router } from "express";
import { pgClient } from "../pgClient";
import { isLoggedIn } from "../middleware";

export const cartRouter = Router();

cartRouter.get("/shopping_cart", async (req, res) => {
  let result = await pgClient.query(
    "SELECT * from shopping_cart join product_variant on product_variant_id = product_variant.id JOIN product on product_variant.product_id = product.id WHERE user_id = (SELECT id from users where email = $1)",
    [req.session.email]
  );
  res.json(result.rows);
});

cartRouter.get("/addToCart", isLoggedIn, async (req, res) => {
  console.log("check");
  let result = await pgClient.query(
    `SELECT  category.name as category_name,product.name as product_name,product_variant.image ,product_variant.unit_price, product_variant.size , product_variant.color
      from shopping_cart 
      join product_variant on product_variant_id = product_variant.id 
      JOIN product on product_variant.product_id = product.id
      JOIN category on product.category_id = category.id 
      WHERE user_id = (SELECT id from users where email = $1)`,
    [req.session.email]
  );
  res.json(result.rows);
});
//<---APP.POST------------------------------------------------------------------------------------------------------------>

cartRouter.post("/addToCart", isLoggedIn, async (req, res) => {
  console.log("gggggg");
  console.log(req.body.product_variant_id, req.session.email);
  await pgClient.query(
    `insert into shopping_cart (user_id, product_variant_id, quantity) VALUES ((SELECT id FROM users WHERE email = $1),$2,1)`,
    [req.session.email, req.body.product_variant_id]
  );
  res.json({ message: "added to shoppingCart" });
});
