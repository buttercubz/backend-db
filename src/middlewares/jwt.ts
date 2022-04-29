import type { RouterContext } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { create, decode } from "https://deno.land/x/djwt@v2.4/mod.ts";
import Database from "../database/init.ts";
import type { User } from "../types.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"]
);

export async function CreateJwt(data: any) {
  const jwt = await create({ alg: "HS512" }, { ...data }, key);

  return jwt;
}

export async function ValidateJwt<T extends string = "">(
  context: RouterContext<T>,
  next: () => Promise<any>
) {
  const jwt = context.request.headers.get("authorization");

  if (jwt === null) {
    context.response.status = 401;
    return (context.response.body = {
      error: "must send an authorization header",
    });
  } else {
    try {
      // ignore header and signature
      const [, payload] = decode(jwt) as any as [any, User];

      const cursor = Database.collection("users");
      const user = await cursor.find({ id: payload?.id }).toArray();

      if (user.length === 0) {
        context.response.status = 404;

        return (context.response.body = {
          error: "User not found",
        });
      }
    } catch {
      context.response.status = 500;
      return (context.response.body = {
        error: "the jwt sent is not valid",
      });
    }
  }

  await next();
}
