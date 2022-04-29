import type { RouterContext } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import Database from "../database/init.ts";
import type { User } from "../types.ts";

export async function ValidateUser<T extends string = "">(
  context: RouterContext<T>,
  next: () => Promise<any>
) {
  const rawBody = context.request.body();
  const body: User = await rawBody.value;

  const cursor = Database.collection("users");
  const user = await cursor.find({ email: body.email }).toArray();

  const allFields =
    !body.email ||
    !body.firstname ||
    !body.lastname ||
    !body.password ||
    !body.default_company;

  if (allFields) {
    context.response.status = 400;
    return (context.response.body = {
      error: "You must submit all fields to create a user.",
    });
  }

  if (user.length > 0) {
    context.response.status = 400;
    return (context.response.body = {
      error: "already exists an user with this email",
    });
  }

  await next();
}
