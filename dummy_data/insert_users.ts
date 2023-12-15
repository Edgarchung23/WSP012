import { pgClient } from "../pgClient";
import { hashPassword } from "../hash";
type UserType = {
  fullname: string;
  username: string;
  email: string;
  phonenumber: string;
  password: string;
  isAdmin: boolean;
};

async function insertUser() {
  let UserArray: UserType[] = [
    {
      fullname: "edgar",
      username: "edgar2023",
      email: "edgar2023@gmail.com",
      phonenumber: "99999999",
      password: "1234",
      isAdmin: false,
    },
    {
      fullname: "navy",
      username: "navy2023",
      email: "navy2023@gmail.com",
      phonenumber: "00000000",
      password: "1234",
      isAdmin: true,
    },
  ];

  await pgClient.connect();

  for (let entry of UserArray) {
    let hashed = await hashPassword(entry.password);
    await pgClient.query(
      "INSERT INTO users (fullname,username,email,phonenumber,password,isAdmin) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        entry.fullname,
        entry.username,
        entry.email,
        entry.phonenumber,
        hashed,
        entry.isAdmin,
      ]
    );
  }

  pgClient.end();
}

insertUser();
