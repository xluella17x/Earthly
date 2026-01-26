import { db } from "../../../db/drizzle/db"
import { 
  PostTable, 
  PostLikeTable, 
  PostAttendeeTable, 
  PostAttendeeStatus 
} from "../../../db/drizzle/schema"
import { and, eq } from "drizzle-orm"

export async function userOwnsPost({ userId, postId }: { userId: string, postId: string }) {
  const existingPost = await db.query.PostTable.findFirst({
    where: and(eq(PostTable.id, postId), eq(PostTable.userId, userId)),
  })
  return existingPost != null
}

export async function insertPost(data: typeof PostTable.$inferInsert) {
  return await db.transaction(async trx => {
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
  data: Partial<typeof PostTable.$inferInsert>
) {
  return await db.transaction(async trx => {
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
    const existing = await trx.query.PostLikeTable.findFirst({
      where: and(
        eq(PostLikeTable.postId, postId),
        eq(PostLikeTable.userId, userId),
      ),
    })

    if (existing) {
      await trx
        .delete(PostLikeTable)
        .where(
          and(
            eq(PostLikeTable.postId, postId),
            eq(PostLikeTable.userId, userId),
          ),
        )
      return { liked: false }
    } else {
      await trx.insert(PostLikeTable).values({ postId, userId })
      return { liked: true }
    }
  })
}

export async function updateAttendance(
  postId: string,
  userId: string,
  status: PostAttendeeStatus,
) {
  return await db
    .insert(PostAttendeeTable)
    .values({ postId, userId, status })
    .onConflictDoUpdate({
      target: [PostAttendeeTable.userId, PostAttendeeTable.postId],
      set: { status, updatedAt: new Date() },
    })
    .returning()
}