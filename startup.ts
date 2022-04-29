import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import Router from "./src/router/router.ts";

const app = new Application();

// for cors
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, PUT, GET, OPTIONS"
  );

  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );

  await next();
});

app.use(Router.routes());
app.use(Router.allowedMethods());

app.addEventListener("listen", (e) =>
  console.log("Listening on http://localhost:8080")
);

await app.listen({ port: 8080 });
