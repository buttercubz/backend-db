import { RouterContext } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { Encript } from "../utils/encrypt.ts";
import type { NewUser } from "../types.ts";
import Database from "../database/init.ts";

export async function CreateUser<P extends string = "">(
  context: RouterContext<P>
) {
  const { response, request } = context;

  const rawBody = request.body();
  const body: NewUser = await rawBody.value;

  const cursor = Database.collection("users");

  const id = crypto.randomUUID();

  await cursor.insertOne({
    id,
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: await Encript(body.password),
    default_company: body.default_company,
    created_at: new Date(),
  });

  response.body = {
    created: true,
  };
}
