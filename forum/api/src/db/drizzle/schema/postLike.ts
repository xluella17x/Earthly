import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { createdAt } from "../schemaHelpers"
import { PostTable } from "./post"

export const PostLikeTable = pgTable(
  "post_likes_table",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => PostTable.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    createdAt,
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.postId] }),
  ]
)

export const PostLikeRelationships = relations(PostLikeTable, ({ one }) => ({
  post: one(PostTable, {
    fields: [PostLikeTable.postId],
    references: [PostTable.id],
  }),
}))