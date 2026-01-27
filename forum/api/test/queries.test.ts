import { describe, expect, it, beforeAll } from "bun:test"
import {
  getPosts,
  getPostById,
  getPostForEdit,
} from "../src/features/posts/db/queries"
import {
  insertPost,
  updateAttendance,
  togglePostLike,
} from "../src/features/posts/db/posts"

describe("Database Queries (Read Logic)", () => {
  const userId = "reader-test-user"
  let publicPostId = ""
  let draftPostId = ""

  beforeAll(async () => {
    const p1 = await insertPost({
      userId,
      title: "Public Event",
      description: "Everyone can see this",
      type: "event",
      status: "published",
    })
    publicPostId = p1.id

    const p2 = await insertPost({
      userId,
      title: "Secret Draft",
      description: "Only I can see this",
      type: "event",
      status: "draft",
    })
    draftPostId = p2.id

    await togglePostLike(publicPostId, userId)
    await updateAttendance(publicPostId, userId, "going")
  })

  it("getPosts - should ONLY return published posts", async () => {
    const posts = await getPosts({ limit: 100 })

    const foundPublic = posts.find((p) => p.id === publicPostId)
    const foundDraft = posts.find((p) => p.id === draftPostId)

    expect(foundPublic).toBeDefined()
    expect(foundDraft).toBeUndefined()
  })

  it("getPosts - should calculate counts correctly", async () => {
    const posts = await getPosts({ currentUserId: userId })
    const myPost = posts.find((p) => p.id === publicPostId)

    if (!myPost) throw new Error("Post not found")

    expect(myPost.likeCount).toBe(1)
    expect(myPost.attendeeCount).toBe(1)
    expect(myPost.isLikedByMe).toBe(true)

    expect(myPost.likes).toBeUndefined()
  })

  it("getPostById - should return detailed stats", async () => {
    const post = await getPostById(publicPostId, userId)

    if (!post) throw new Error("Post not found")

    expect(post.title).toBe("Public Event")
    expect(post.goingCount).toBe(1)
    expect(post.interestedCount).toBe(0)
    expect(post.myAttendeeStatus).toBe("going")
  })

  it("getPostById - should return NULL for drafts (Public View)", async () => {
    const post = await getPostById(draftPostId, userId)
    expect(post).toBeNull()
  })

  it("getPostForEdit - should return drafts (Admin View)", async () => {
    const post = await getPostForEdit(draftPostId)

    expect(post).toBeDefined()
    expect(post?.title).toBe("Secret Draft")
  })
})
