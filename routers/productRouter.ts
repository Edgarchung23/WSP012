import { Router } from "express";
import { pgClient } from "../pgClient";

export const productRouter = Router();

productRouter.get("/category", async (req, res) => {
  if (req.query.id) {
    let allResult = await pgClient.query(
      "SELECT product.name as product_name,category.name as category_name , image,unit_price,product.id FROM product join category on product.category_id = category.id WHERE product.category_id = $1 ",
      [req.query.id]
    );
    res.json({ data: allResult.rows });
  } else {
    let allResult = await pgClient.query(
      "SELECT product.name as product_name,category.name as category_name , image,unit_price,product.id  FROM product join category on product.category_id = category.id"
    );
    res.json({ data: allResult.rows });
  }
});

productRouter.get("/product", async (req, res) => {
  if (req.query.id) {
    let queryResult = await pgClient.query(
      "SELECT product.name as product_name,image,description,brand,material,unit_price,category.name as category_name FROM product join category on product.category_id = category.id WHERE product.id = $1",
      [req.query.id]
    );
    res.json(queryResult.rows);
  } else {
    let queryResult = await pgClient.query("SELECT * FROM product ");
    res.json(queryResult.rows);
  }
});

productRouter.get("/product_variant", async (req, res) => {
  if (req.query.id) {
    let queryResult = await pgClient.query(
      "SELECT * from product_variant WHERE product_id = $1",
      [req.query.id]
    );
    res.json({ data: queryResult.rows });
  }
});

productRouter.get("/product/image", async (req, res) => {
  let queryResult = await pgClient.query("SELECT * FROM product ");
  res.json(queryResult.rows);
});
