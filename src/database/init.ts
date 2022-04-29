import { MongoClient } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

const client = new MongoClient();

await client.connect(
  `mongodb+srv://${Deno.env.get("DB_USER")}:${Deno.env.get(
    "DB_PASSWORD"
  )}@cluster0.2a32f.mongodb.net/Users?authMechanism=SCRAM-SHA-1`
);

console.log("Database connected");

export default client.database("Users");
