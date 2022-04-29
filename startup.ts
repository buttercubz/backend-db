import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import Router from "./src/router/router.ts";

const app = new Application();

app.use(Router.routes());
app.use(Router.allowedMethods());

app.addEventListener("listen", (e) =>
  console.log("Listening on http://localhost:8080")
);

await app.listen({ port: 8080 });
