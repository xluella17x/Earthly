import { db } from "../../../db/drizzle/db"
import { PostTable } from "../../../db/drizzle/schema"
import { and, eq } from "drizzle-orm"

export async function userOwnsPost({ userId, postId }: { userId: string, postId: string }) {
  const existingPost = await db.query.PostTable.findFirst({
    where: and(
      eq(PostTable.id, postId),
      eq(PostTable.userId, userId)
    ),
  })

  return existingPost != null
}

export async function insertPost(data: typeof PostTable.$inferInsert) {
  const newPost = await db.transaction(async trx => {
    const [newPost] = await trx.insert(PostTable).values(data).returning()
    
    if (newPost == null) {
      trx.rollback()
      throw new Error("Failed to create post")
    }

    // optional: link tags or images here in a separate table

    return newPost
  })

  return newPost
}

export async function updatePost(
  id: string,
  data: Partial<typeof PostTable.$inferInsert>
) {
  const updatedPost = await db.transaction(async trx => {
    const [updatedPost] = await trx
      .update(PostTable)
      .set(data)
      .where(eq(PostTable.id, id))
      .returning()

    if (updatedPost == null) {
      trx.rollback()
      throw new Error("Failed to update post")
    }

    return updatedPost
  })

  return updatedPost
}

export async function deletePost(id: string) {
  const [deletedPost] = await db
    .delete(PostTable)
    .where(eq(PostTable.id, id))
    .returning()

  if (deletedPost == null) throw new Error("Failed to delete post")

  return deletedPost
}