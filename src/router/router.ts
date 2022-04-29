import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { ValidateUser } from "../middlewares/existUser.ts";
import { CreateUser } from "../controllers/users.post.ts";
import { GetUsers } from "../controllers/users.get.ts";
import { ValidateJwt } from "../middlewares/jwt.ts";
import { Auth } from "../controllers/auth.ts";

const Route = new Router();

/**
 * get all users
 */
Route.get(
  "/v1/users",
  (context, next) => ValidateJwt<"/v1/users">(context, next),
  (context) => GetUsers<"/v1/users">(context)
);

/**
 * create new user
 */
Route.post(
  "/v1/users",
  (context, next) => ValidateUser<"/v1/users">(context, next),
  (context) => CreateUser<"/v1/users">(context)
);

/**
 * login user
 */
Route.post("/v1/auth", (context) => Auth<"/v1/auth">(context));

export default Route;
