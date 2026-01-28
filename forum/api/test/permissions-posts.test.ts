import { describe, it, expect } from "vitest"
import {
  canCreatePost,
  canUpdatePost,
  canDeletePost,
  wherePublicPosts,
} from "../src/features/posts/permissions/posts"

describe("post permissions", () => {
  const normalUser = { id: "user-1", role: "user" }
  const adminUser = { id: "admin-1", role: "admin" }

  it("does not allow creating a post when user is undefined", () => {
    expect(canCreatePost(undefined)).toBe(false)
  })

  it("allows creating a post when user exists", () => {
    expect(canCreatePost(normalUser)).toBe(true)
  })

  it("does not allow updating when user is undefined", () => {
    expect(canUpdatePost(undefined, "user-1")).toBe(false)
  })

  it("allows admin to update any post", () => {
    expect(canUpdatePost(adminUser, "someone-else")).toBe(true)
  })

  it("allows post owner to update their own post", () => {
    expect(canUpdatePost(normalUser, "user-1")).toBe(true)
  })

  it("does not allow non-owner non-admin to update post", () => {
    expect(canUpdatePost(normalUser, "other-user")).toBe(false)
  })

  it("does not allow deleting when user is undefined", () => {
    expect(canDeletePost(undefined, "user-1")).toBe(false)
  })

  it("allows admin to delete any post", () => {
    expect(canDeletePost(adminUser, "someone-else")).toBe(true)
  })

  it("allows post owner to delete their own post", () => {
    expect(canDeletePost(normalUser, "user-1")).toBe(true)
  })

  it("does not allow non-owner non-admin to delete post", () => {
    expect(canDeletePost(normalUser, "other-user")).toBe(false)
  })

  it("defines a wherePublicPosts condition", () => {
    expect(wherePublicPosts).toBeDefined()
  })
})
