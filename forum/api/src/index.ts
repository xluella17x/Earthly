import { Elysia } from "elysia"
import { postsRouter } from "./routes/posts"

const app = new Elysia()
  .use(postsRouter)
  .listen(3000)

console.log(`🦊 Forum Service running at ${app.server?.hostname}:${app.server?.port}`)