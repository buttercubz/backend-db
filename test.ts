import { Encript } from "./src/utils/encrypt.ts";
import { CreateJwt } from "./src/middlewares/jwt.ts";

console.log(await CreateJwt({ klk: true, name: "erick" }));
