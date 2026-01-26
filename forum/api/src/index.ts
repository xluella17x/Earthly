import { Elysia } from "elysia"
import { postsRoutes } from "./routes/posts"
import { swagger } from "@elysiajs/swagger"
import { cors } from "@elysiajs/cors"

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .use(postsRoutes)
  .get("/", () => "Welcome to the Forum Service!")
  .listen(5174)
  

console.log(`🦊 Forum Service running at ${app.server?.hostname}:${app.server?.port}`)