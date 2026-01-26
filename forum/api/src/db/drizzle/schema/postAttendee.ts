import { pgEnum, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schemaHelpers"
import { PostTable } from "./post"

export const postAttendeeStatuses = ["going", "interested", "not_going"] as const
export type PostAttendeeStatus = (typeof postAttendeeStatuses)[number]
export const postAttendeeStatusEnum = pgEnum("post_attendee_status", postAttendeeStatuses)


export const PostAttendeeTable = pgTable(
  "post_attendees_table",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => PostTable.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    status: postAttendeeStatusEnum("status").notNull().default("not_going"), 
    createdAt,
    updatedAt,
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.postId] }),
  ]
)

export const PostAttendeeRelationships = relations(PostAttendeeTable, ({ one }) => ({
  post: one(PostTable, {
    fields: [PostAttendeeTable.postId],
    references: [PostTable.id],
  }),
}))