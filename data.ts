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
  emailaddress: string;
  password: string;
};

async function main() {
  await client.connect();

  const filePath = "dummy-data/course-0480629867024-WSP009-exercise.xlsx";

  const workbook = xlsx.readFile(filePath);

  const userSheet = workbook.Sheets["user"];

  const usersData: UserType[] = xlsx.utils.sheet_to_json<UserType>(userSheet);

  for (let entry of usersData) {
    console.log(entry.emailaddress, entry.password);

    let hashed = await hashPassword(entry.password);
    await client.query(`INSERT INTO users (username,password) values ($1,$2)`, [
      entry.emailaddress,
      hashed,
    ]);
  }
}

main();
