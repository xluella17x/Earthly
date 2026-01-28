import { Elysia, t } from "elysia"
import {
  PostTable,
  postTypes,
  postAttendeeStatuses,
} from "../db/drizzle/schema"
import { eq } from "drizzle-orm"
import { getPosts, getPostById } from "../features/posts/db/queries"
import {
  insertPost,
  togglePostLike,
  toggleAttendance,
} from "../features/posts/db/posts"

export const postsRoutes = new Elysia({ prefix: "/posts" })
  .derive(({ headers }) => {
    return {
      user: {
        id: "test-user-id",
        role: "admin",
      },
    }
  })

  .get("/", async ({ query, user }) => {
    const { type, limit } = query
    const where = type ? eq(PostTable.type, type as any) : undefined

    return await getPosts({
      where,
      limit: limit ? parseInt(limit) : 50,
      currentUserId: user?.id,
    })
  })

  .get("/:id", async ({ params, user, set }) => {
    const post = await getPostById(params.id, user?.id)

    if (!post) {
      set.status = 404
      return "Post not found"
    }
    return post
  })

  .post(
    "/",
    async ({ body, user, set }) => {
      if (!user) {
        set.status = 401
        return "Unauthorized"
      }

      return await insertPost({
        ...body,
        userId: user.id,
        status: "published",
        type: body.type as any,
      })
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        locationName: t.String({
          minLength: 1,
          error: "Location is required",
        }),
        type: t.Union(postTypes.map((type) => t.Literal(type))),
        latitude: t.Optional(t.Number()), 
        longitude: t.Optional(t.Number()), 
      }),
    },
  )

  .post("/:id/like", async ({ params, user, set }) => {
    if (!user) {
      set.status = 401
      return "Unauthorized"
    }
    return await togglePostLike(params.id, user.id)
  })

  .post(
    "/:id/attend",
    async ({ params, body, user, set }) => {
      if (!user) {
        set.status = 401
        return "Unauthorized"
      }

      return await toggleAttendance(params.id, user.id)
    },
    {
      body: t.Object({
        status: t.Union(postAttendeeStatuses.map((s) => t.Literal(s))),
      }),
    },
  )