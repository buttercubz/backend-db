import { RouterContext } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import Database from "../database/init.ts";
import type { User } from "../types.ts";

export async function GetUsers<P extends string = "">(
  context: RouterContext<P>
) {
  const { response } = context;

  const cursor = Database.collection<User>("users");
  const allUsers = await cursor.find({}).toArray();

  response.body = allUsers;
}
