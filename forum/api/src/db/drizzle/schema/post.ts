import {
  pgTable,
  text,
  doublePrecision,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { id, createdAt, updatedAt, deletedAt } from "../schemaHelpers"
import { PostLikeTable } from "./postLike"
import { PostAttendeeTable } from "./postAttendee"

export const postTypes = ["event", "discussion", "announcement"] as const
export type PostType = (typeof postTypes)[number]
export const postTypeEnum = pgEnum("post_type", postTypes)

export const postStatuses = ["draft", "published", "archived"] as const
export type PostStatus = (typeof postStatuses)[number]
export const postStatusEnum = pgEnum("post_status", postStatuses)

export const PostTable = pgTable("posts_table", {
  id,
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: postTypeEnum("type").notNull(),
  imageUrl: text("image_url"),
  status: postStatusEnum("status").notNull(),
  locationName: text("location_name"),
  lat: doublePrecision("latitude"),
  lng: doublePrecision("longitude"),
  createdAt,
  updatedAt,
  deletedAt,
})

export const PostRelationships = relations(PostTable, ({ many }) => ({
  likes: many(PostLikeTable),
  attendees: many(PostAttendeeTable),
}))
