import { describe, expect, it } from "bun:test"
import {
  insertPost,
  updatePost,
  deletePost,
  togglePostLike,
  updateAttendance,
} from "../src/features/posts/db/posts"
import { userOwnsPost } from "../src/features/posts/db/posts"

describe("Database Mutations (Write Logic)", () => {
  const userId = "mutation-test-user"
  let postId = ""

  it("should INSERT a new post", async () => {
    const post = await insertPost({
      userId,
      title: "Test Mutation Post",
      description: "Testing DB writes",
      type: "discussion",
      status: "published",
      locationName: "Test Lab",
    })

    expect(post).toBeDefined()
    expect(post.id).toBeString()
    expect(post.title).toBe("Test Mutation Post")

    postId = post.id
  })

  it("should UPDATE a post", async () => {
    await Bun.sleep(100)

    const updated = await updatePost(postId, {
      title: "Updated Title",
    })

    expect(updated.title).toBe("Updated Title")
    expect(updated.updatedAt.getTime()).toBeGreaterThan(
      updated.createdAt.getTime(),
    )
  })

  it("should verify OWNERSHIP", async () => {
    const isOwner = await userOwnsPost({ userId, postId })
    const isNotOwner = await userOwnsPost({ userId: "stranger", postId })

    expect(isOwner).toBe(true)
    expect(isNotOwner).toBe(false)
  })

  it("should TOGGLE LIKE (Add then Remove)", async () => {
    const result1 = await togglePostLike(postId, userId)
    expect(result1.liked).toBe(true)

    const result2 = await togglePostLike(postId, userId)
    expect(result2.liked).toBe(false)
  })

  it("should UPSERT ATTENDANCE (Insert then Update)", async () => {
    const result1 = await updateAttendance(postId, userId, "interested")
    expect(result1[0].status).toBe("interested")

    const result2 = await updateAttendance(postId, userId, "going")
    expect(result2[0].status).toBe("going")
  })

  it("should DELETE a post", async () => {
    const deleted = await deletePost(postId)
    expect(deleted.id).toBe(postId)
  })
})
