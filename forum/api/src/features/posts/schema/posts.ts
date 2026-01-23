import { PostTable, postTypes } from "../../../db/drizzle/schema"
import { t } from "elysia"

// This utility function will convert Drizzle schema into a plain object, which can pick by property name as plain object:
import { spread } from "../../../db/drizzle/utils"
const fields = spread(PostTable, "insert")

export const postSchema = t.Object(
  {
    title: t.String({
      minLength: 1,
      error: "Required",
    }),
    description: t.String({
      minLength: 1,
      error: "Required",
    }),
    imageUrl: t.Optional(
      t.String({ format: "uri", error: "Invalid url" }),
    ),
    type: fields.type,
    locationName: t.Optional(fields.locationName),
    lat: t.Optional(fields.lat),
    lng: t.Optional(fields.lng),
  },
  { additionalProperties: false },
)

// export type CreatePostInput = typeof postSchema.static
