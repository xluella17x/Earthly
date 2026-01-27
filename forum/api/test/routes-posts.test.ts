import { describe, expect, it, beforeAll } from "bun:test"
import { Elysia } from "elysia"
import { postsRoutes } from "../src/routes/posts"

const app = new Elysia().use(postsRoutes)

describe("Posts API Integration Tests", () => {
  let createdPostId: string = ""

  it("POST /posts - should create a new post", async () => {
    const response = await app.handle(
      new Request("http://localhost/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Integration Test Event",
          description: "Created by Bun Test Runner",
          type: "event",
          locationName: "Test Lab",
        }),
      }),
    )

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data).toHaveProperty("id")
    expect(data.title).toBe("Integration Test Event")
    expect(data.status).toBe("published")

    createdPostId = data.id
  })

  it("GET /posts - should return a list of posts", async () => {
    const response = await app.handle(new Request("http://localhost/posts"))

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })

  it("GET /posts/:id - should return the post details", async () => {
    expect(createdPostId).toBeTruthy()

    const response = await app.handle(
      new Request(`http://localhost/posts/${createdPostId}`),
    )

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.id).toBe(createdPostId)
    expect(data.likeCount).toBeDefined()
  })

  it("POST /posts/:id/like - should toggle like", async () => {
    const response = await app.handle(
      new Request(`http://localhost/posts/${createdPostId}/like`, {
        method: "POST",
      }),
    )

    expect(response.status).toBe(200)
    const data = await response.json()

    expect(data.liked).toBeBoolean()
  })

  it("GET /posts/bad-id - should return 404", async () => {
    const fakeId = "00000000-0000-0000-0000-000000000000"

    const response = await app.handle(
      new Request(`http://localhost/posts/${fakeId}`),
    )

    expect(response.status).toBe(404)
  })
})
