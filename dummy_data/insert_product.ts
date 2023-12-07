import { Client } from "pg";
import dotenv from "dotenv";
// import { hashPassword } from "./hash";
dotenv.config();

const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

main();
async function main() {
  await client.connect();
  await insertCategory();
  await client.end();
}

async function insertCategory() {
  await client.query(
    `INSERT INTO category (name)
VALUES ($1),($2),($3),($4)
`,
    ["按摩槍", "按摩波", "瑜伽墊", "瑜伽波"]
  );
}

// type insertProduct = {
//   name: string;
//   brand: string;
//   material: string;
//   catergory_id: number;
//   image: string;
// };
