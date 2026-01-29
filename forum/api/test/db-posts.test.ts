import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { db } from "../src/db/drizzle/db"
import { PostTable } from "../src/db/drizzle/schema"
import {
  insertPost,
  updatePost,
  deletePost,
  userOwnsPost,
  togglePostLike,
  toggleAttendance,
} from "../src/features/posts/db/posts"
import { eq } from "drizzle-orm"

describe("Post Mutations", () => {
  let testUserId: string

  beforeEach(() => {
    testUserId = crypto.randomUUID()
  })

  afterEach(async () => {
    await db.delete(PostTable).where(eq(PostTable.userId, testUserId))
  })

  it("should insert a new post", async () => {
    const postData = {
      userId: testUserId,
      title: "Test Post",
      description: "Test Description",
      type: "event" as const,
      status: "published" as const,
    }

    const post = await insertPost(postData)

    expect(post).toBeDefined()
    expect(post.id).toBeDefined()
    expect(post.title).toBe(postData.title)
    expect(post.userId).toBe(testUserId)
  })

  it("should update an existing post", async () => {
    const post = await insertPost({
      userId: testUserId,
      title: "Original Title",
      description: "Original Description",
      type: "event",
      status: "published",
    })

    const updated = await updatePost(post.id, { title: "Updated Title" })

    expect(updated.title).toBe("Updated Title")
    expect(updated.updatedAt).toBeDefined()
  })

  it("should delete a post", async () => {
    const post = await insertPost({
      userId: testUserId,
      title: "To Delete",
      description: "To Delete Description",
      type: "event",
      status: "published",
    })

    await deletePost(post.id)

    const check = await db.query.PostTable.findFirst({
      where: eq(PostTable.id, post.id),
    })
    expect(check).toBeUndefined()
  })

  it("should check post ownership correctly", async () => {
    const post = await insertPost({
      userId: testUserId,
      title: "My Post",
      description: "My Description",
      type: "event",
      status: "published",
    })

    const isOwner = await userOwnsPost({ userId: testUserId, postId: post.id })
    const isNotOwner = await userOwnsPost({
      userId: "some-random-other-id",
      postId: post.id,
    })

    expect(isOwner).toBe(true)
    expect(isNotOwner).toBe(false)
  })

  describe("Toggles (Like & Attendance)", () => {
    it("should toggle like on and off", async () => {
      const post = await insertPost({
        userId: testUserId,
        title: "Likeable Post",
        description: "Content",
        type: "event",
        status: "published",
      })

      const result1 = await togglePostLike(post.id, testUserId)
      expect(result1.liked).toBe(true)

      const result2 = await togglePostLike(post.id, testUserId)
      expect(result2.liked).toBe(false)
    })

    it("should toggle attendance on and off", async () => {
      const post = await insertPost({
        userId: testUserId,
        title: "Event Post",
        description: "Event details",
        type: "event",
        status: "published",
      })

      const result1 = await toggleAttendance(post.id, testUserId)
      expect(result1.status).toBe("going")

      const result2 = await toggleAttendance(post.id, testUserId)
      expect(result2.status).toBe("removed")
    })
  })
})
