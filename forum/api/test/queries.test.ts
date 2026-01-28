import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { db } from "../src/db/drizzle/db"
import { PostTable } from "../src/db/drizzle/schema"
import { insertPost, togglePostLike, toggleAttendance } from "../src/features/posts/db/posts"
import { getPosts, getPostById } from "../src/features/posts/db/queries"
import { eq } from "drizzle-orm"

describe("Post Queries", () => {
  let userAId: string
  let userBId: string

  beforeEach(() => {
    userAId = crypto.randomUUID()
    userBId = crypto.randomUUID()
  })
  
  afterEach(async () => {
      await db.delete(PostTable).where(eq(PostTable.userId, userAId))
  })

  it("should fetch posts with correct boolean flags", async () => {
    const post = await insertPost({
      userId: userAId,
      title: "Interactive Post",
      description: "Interactive Description",
      type: "event",
      status: "published", 
    })

    await togglePostLike(post.id, userBId)
    await toggleAttendance(post.id, userBId)

    const postsForB = await getPosts({ currentUserId: userBId })
    const targetPostB = postsForB.find((p) => p.id === post.id)

    expect(targetPostB).toBeDefined()
    expect(targetPostB?.isLikedByMe).toBe(true) 
    expect(targetPostB?.isAttending).toBe(true) 
    expect(targetPostB?.likeCount).toBe(1)
    expect(targetPostB?.attendeeCount).toBe(1)

    const postsForA = await getPosts({ currentUserId: userAId })
    const targetPostA = postsForA.find((p) => p.id === post.id)

    expect(targetPostA?.isLikedByMe).toBe(false)
    expect(targetPostA?.isAttending).toBe(false)
  })

  it("getPostById should return detailed counts and status", async () => {
    const post = await insertPost({
      userId: userAId,
      title: "Detailed Post",
      description: "Details here",
      type: "event",
      status: "published",
    })

    await toggleAttendance(post.id, userAId)

    const result = await getPostById(post.id, userAId)

    expect(result).not.toBeNull()
    expect(result?.title).toBe("Detailed Post")
    expect(result?.myAttendeeStatus).toBe("going")
    expect(result?.goingCount).toBe(1)
  })

it("should return null for non-existent post", async () => {
    const nonExistentId = crypto.randomUUID() 
    
    const result = await getPostById(nonExistentId, userAId)
    expect(result).toBeNull()
  })
})