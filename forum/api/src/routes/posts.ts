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

type PostType = (typeof postTypes)[number]

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
    const where = type ? eq(PostTable.type, type as PostType) : undefined

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
        type: body.type as PostType,
      })
    },
    {
      body: t.Object({
        title: t.String({
          minLength: 5,
          error: "Title must be at least 5 characters",
        }),

        description: t.String({
          minLength: 5,
          error: "Description must be at least 5 characters",
        }),

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
    async ({ params, user, set }) => {
      if (!user) {
        set.status = 401
        return "Unauthorized"
      }

      return await toggleAttendance(params.id, user.id)
    },
    {
      params: t.Object({ id: t.String() }),
    },
  )
