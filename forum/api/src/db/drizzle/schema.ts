import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-typebox"
import { t } from "elysia"

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(),
  authorId: uuid("author_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const insertPostSchema = createInsertSchema(posts, {
  title: t.String({ minLength: 3 }),
  type: t.String(),
})

export const createPostBody = t.Pick(insertPostSchema, [
  "title",
  "content",
  "type",
])
