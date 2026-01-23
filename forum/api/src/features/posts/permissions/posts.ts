import { PostTable } from "../../../db/drizzle/schema"
import { eq } from "drizzle-orm"

type User = { 
  id: string
  role: string
}

export function canCreatePost(user: User | undefined) {
  return user != null
}

export function canUpdatePost(user: User | undefined, postUserId: string) {
  if (!user) return false
  return user.role === "admin" || user.id === postUserId
}

export function canDeletePost(user: User | undefined, postUserId: string) {
  if (!user) return false
  return user.role === "admin" || user.id === postUserId
}

export const wherePublicPosts = eq(PostTable.type, "event")