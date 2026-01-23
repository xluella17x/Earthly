import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schemaHelpers"
import { PostTable } from "./post"

export const PostAttendeeTable = pgTable(
  "post_attendees_table",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => PostTable.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    status: text("status").notNull().default("going"), 
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