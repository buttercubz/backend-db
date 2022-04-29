import { RouterContext } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { CreateJwt } from "../middlewares/jwt.ts";
import { Encript } from "../utils/encrypt.ts";
import type { UserLogin } from "../types.ts";
import Database from "../database/init.ts";

export async function Auth<P extends string = "">(context: RouterContext<P>) {
  const { response, request } = context;

  const rawBody = request.body();
  const body: UserLogin = await rawBody.value;

  const cursor = Database.collection("users");
  const user = await cursor.find({ email: body.email }).toArray();

  if (user.length === 0) {
    response.status = 404;

    return (response.body = {
      error: "User not found",
    });
  } else {
    const data = user[0];

    if (data.password === (await Encript(body.password))) {
      response.status = 200;

      return (response.body = { token: await CreateJwt(data) });
    } else {
      response.status = 401;

      return (response.body = {
        error: "Invalid password",
      });
    }
  }
}
