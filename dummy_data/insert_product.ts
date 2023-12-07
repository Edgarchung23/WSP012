import { Client } from "pg";
import dotenv from "dotenv";
// import { hashPassword } from "./hash";
dotenv.config();
const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
// <------------------------------------------------------------------------------------------------>
main();
async function main() {
  await client.connect();
  await insertCategory();
  await insertProduct();
  await client.end();
}
// <--INSERT CATEGROY------------------------------------------------------------------------------------------->

async function insertCategory() {
  await client.query(
    `INSERT INTO category (name)
    VALUES ($1),($2),($3),($4)
    `,
    ["按摩槍", "按摩波", "瑜伽墊", "瑜伽波"]
  );
}
// <--INSERT PRODUCT------------------------------------------------------------------------------------------->
type insertProductType = {
  name: string;
  brand: string;
  material: string;
  category_id: number;
  unit_price: number;
  image: string;
};
async function insertProduct() {
  const result = await client.query(`SELECT * FROM category WHERE name = $1`, [
    "按摩槍",
  ]);
  const productCategory = result.rows[0].id;

  let productData: insertProductType[] = [
    {
      name: "M2降噪筋膜按摩槍",
      brand: "Booster",
      material: "矽膠",
      category_id: productCategory,
      unit_price: 200,
      image: "gun-1-blue.webp",
    },
  ];
  for (let entry of productData) {
    await client.query(
      `INSERT INTO product(category_id,name,brand,material,image,unit_price)VALUES($1,$2,$3,$4,$5,$6)`,
      [
        entry.category_id,
        entry.name,
        entry.brand,
        entry.material,
        entry.image,
        entry.unit_price,
      ]
    );
  }
}
