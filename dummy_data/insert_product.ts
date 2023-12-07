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
  const result = await client.query(
    `SELECT * FROM category WHERE name = $1 OR name = $2 OR name = $3 OR name = $4`,
    ["按摩槍", "按摩波", "瑜伽墊", "瑜伽波"]
  );
  const productCategory_Massagegun = result.rows[0].id;
  const productCategory_Massageball = result.rows[1].id;
  const productCategory_Yogamat = result.rows[2].id;
  const productCategory_Yogaball = result.rows[3].id;
  const productDetails: insertProductType[] = [
    {
      name: "M2降噪筋膜按摩槍",
      brand: "Booster",
      material: "矽膠",
      category_id: productCategory_Massagegun,
      unit_price: 888,
      image: "gun-1-blue.webp",
    },
    {
      name: "燈光版Smart-Hit深度筋膜按摩槍",
      brand: "Booster",
      material: "矽膠",
      category_id: productCategory_Massagegun,
      unit_price: 1688,
      image: "gun-2-grey.webp",
    },
    {
      name: "M1專業級深層冷熱敷高頻筋膜槍",
      brand: "GXA",
      material: "磨砂",
      category_id: productCategory_Massagegun,
      unit_price: 688,
      image: "gun-3-grey.webp",
    },
    {
      name: "方形M2升級筋膜按摩槍",
      brand: "Booster",
      material: "磨砂",
      category_id: productCategory_Massagegun,
      unit_price: 688,
      image: "gun-4-black.webp",
    },
    {
      name: "T型深度筋膜按摩槍",
      brand: "Booster",
      material: "矽膠",
      category_id: productCategory_Massagegun,
      unit_price: 688,
      image: "gun-5-silver.webp",
    },
    //<---YOGA BALL------------------------------------------------------------------------------>
    {
      name: "電動瑜伽肌肉按摩筋膜球",
      brand: "Yottoy",
      material: "矽膠",
      category_id: productCategory_Massageball,
      unit_price: 388,
      image: "ball-1-pink.webp",
    },
    {
      name: "深層肌肉按摩筋膜球",
      brand: "Master of Muscle",
      material: "矽膠",
      category_id: productCategory_Massageball,
      unit_price: 168,
      image: "ball-2-red.webp",
    },
    {
      name: "深層肌肉按摩球",
      brand: "Master of Muscle",
      material: "矽膠",
      category_id: productCategory_Massageball,
      unit_price: 168,
      image: "ball-3-yellow.webp",
    },
    {
      name: "電動瑜伽肌肉按摩筋膜花生球",
      brand: "Yottoy",
      material: "矽膠",
      category_id: productCategory_Massageball,
      unit_price: 388,
      image: "ball-4-blue.webp",
    },
    {
      name: "德國電動深層按摩球",
      brand: "Beurer",
      material: "矽膠、ABS樹脂",
      category_id: productCategory_Massageball,
      unit_price: 588,
      image: "ball-5-black.webp",
    },
    //<---YOGA MAT------------------------------------------------------------------------------>
    {
      name: "家用加厚靜音減震瑜伽跳繩墊｜體位線版",
      brand: "MEJEY",
      material: "環保TPE",
      category_id: productCategory_Yogamat,
      unit_price: 488,
      image: "mat_1_grey.webp",
    },
    {
      name: "天然橡膠瑜伽墊 | 純淨版(紫色)",
      brand: "Yottoy",
      material: "天然橡膠、PU",
      category_id: productCategory_Yogamat,
      unit_price: 488,
      image: "mat_2_purple.webp",
    },
    {
      name: "天然橡膠瑜伽墊 | 體位線版",
      brand: "Yottoy",
      material: "天然橡膠、PU",
      category_id: productCategory_Yogamat,
      unit_price: 588,
      image: "mat_3_pink.webp",
    },
    {
      name: "天然橡膠瑜伽墊 | 水波狀紋理版",
      brand: "Manduka",
      material: "純天然橡膠",
      category_id: productCategory_Yogamat,
      unit_price: 1688,
      image: "mat_4_green.webp",
    },
    {
      name: "天然橡膠瑜伽墊 | 純淨版(綠色",
      brand: "iyogasports",
      material: "彩色純天然橡膠",
      category_id: productCategory_Yogamat,
      unit_price: 1588,
      image: "mat_5_green.webp",
    },
    //<---YOGA MAT------------------------------------------------------------------------------>
    {
      name: "瑜伽平衡健身半圓平衡球",
      brand: "MEJEY",
      material: "PE環保物料",
      category_id: productCategory_Yogaball,
      unit_price: 688,
      image: "yoga_ball_1webp",
    },
    {
      name: "防爆瑜伽普拉提球",
      brand: "ALTUS",
      material: "PVC",
      category_id: productCategory_Yogaball,
      unit_price: 388,
      image: "yoga_ball_2webp",
    },
    {
      name: "防爆迷你瑜伽普拉提球",
      brand: "Master of Muscle",
      material: "PVC",
      category_id: productCategory_Yogaball,
      unit_price: 188,
      image: "yoga_ball_3webp",
    },
  ];
  for (let entry of productDetails) {
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
