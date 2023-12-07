import { Client } from "pg";
import dotenv from "dotenv";
import xlsx from "xlsx";
import { hashPassword } from "./hash";
dotenv.config();

const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
type UserType = {
  fullname: string;
  username: string;
  email: string;
  phonenumber: number;
  password: string;
};

async function main() {
  await client.connect();

  const usersData: UserType[] = xlsx.utils.sheet_to_json<UserType>(userSheet);

  for (let entry of usersData) {
    console.log(entry.email, entry.password);

    let hashed = await hashPassword(entry.password);
    await client.query(
      `INSERT INTO users (fullname,username,email,phonenumber,password) values ($1,$2)`,
      [
        entry.fullname,
        entry.username,
        entry.email,
        entry.phonenumber,
        entry.password,
        hashed,
      ]
    );
  }
}

main();
