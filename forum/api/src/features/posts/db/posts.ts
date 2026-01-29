import { db } from "../../../db/drizzle/db"
import {
  PostTable,
  PostLikeTable,
  PostAttendeeTable,
  PostAttendeeStatus,
} from "../../../db/drizzle/schema"
import { and, eq } from "drizzle-orm"

export async function userOwnsPost({
  userId,
  postId,
}: {
  userId: string
  postId: string
}) {
  const existingPost = await db.query.PostTable.findFirst({
    where: and(eq(PostTable.id, postId), eq(PostTable.userId, userId)),
  })
  return existingPost != null
}

export async function insertPost(data: typeof PostTable.$inferInsert) {
  return await db.transaction(async (trx) => {
    const [newPost] = await trx.insert(PostTable).values(data).returning()

    if (!newPost) {
      trx.rollback()
      throw new Error("Failed to create post")
    }
    return newPost
  })
}

export async function updatePost(
  id: string,
  data: Partial<typeof PostTable.$inferInsert>,
) {
  return await db.transaction(async (trx) => {
    const [updatedPost] = await trx
      .update(PostTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(PostTable.id, id))
      .returning()

    if (!updatedPost) {
      trx.rollback()
      throw new Error("Failed to update post")
    }
    return updatedPost
  })
}

export async function deletePost(id: string) {
  const [deletedPost] = await db
    .delete(PostTable)
    .where(eq(PostTable.id, id))
    .returning()

  if (!deletedPost) throw new Error("Failed to delete post")
  return deletedPost
}

export async function togglePostLike(postId: string, userId: string) {
  return await db.transaction(async (trx) => {
    const deleted = await trx
      .delete(PostLikeTable)
      .where(
        and(eq(PostLikeTable.postId, postId), eq(PostLikeTable.userId, userId)),
      )
      .returning()

    if (deleted.length > 0) {
      return { liked: false }
    }

    await trx
      .insert(PostLikeTable)
      .values({ postId, userId })
      .onConflictDoNothing()

    return { liked: true }
  })
}

export async function toggleAttendance(postId: string, userId: string) {
  return await db.transaction(async (trx) => {
    const deleted = await trx
      .delete(PostAttendeeTable)
      .where(
        and(
          eq(PostAttendeeTable.postId, postId),
          eq(PostAttendeeTable.userId, userId),
        ),
      )
      .returning()

    if (deleted.length > 0) {
      return { status: "removed" }
    }

    await trx
      .insert(PostAttendeeTable)
      .values({
        postId,
        userId,
        status: "going",
      })
      .onConflictDoNothing()

    return { status: "going" }
  })
}
