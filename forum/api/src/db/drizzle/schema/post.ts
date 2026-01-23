import { pgTable, text, doublePrecision } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { id, createdAt, updatedAt } from "../schemaHelpers"
import { PostLikeTable } from "./postLike"
import { PostAttendeeTable } from "./postAttendee"

export const PostTable = pgTable("posts_table", {
  id,
  userId: text("user_id").notNull(), 
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  imageUrl: text("image_url"),
  locationName: text("location_name"),
  lat: doublePrecision("latitude"),
  lng: doublePrecision("longitude"),
  createdAt,
  updatedAt,
})

export const PostRelationships = relations(PostTable, ({ many }) => ({
  likes: many(PostLikeTable),
  attendees: many(PostAttendeeTable),
}))