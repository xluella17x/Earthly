import { db } from "../../../db/drizzle/db"
import { PostTable, postAttendeeStatuses } from "../../../db/drizzle/schema"
import { and, desc, eq, SQL } from "drizzle-orm"
import { wherePublicPosts } from "../permissions/posts"

const postCardColumns = {
  id: true,
  title: true,
  description: true,
  type: true,
  locationName: true,
  createdAt: true,
} as const

export async function getPosts({
  where,
  limit = 50,
  offset = 0,
  currentUserId,
}: {
  where?: SQL
  limit?: number
  offset?: number
  currentUserId?: string
} = {}) {
  const posts = await db.query.PostTable.findMany({
    columns: postCardColumns,
    where: and(wherePublicPosts, where),
    orderBy: [desc(PostTable.createdAt)],
    limit,
    offset,
    with: {
      likes: { columns: { userId: true } },
      attendees: { columns: { userId: true } },
    },
  })

  return posts.map((post) => ({
    ...post,
    likeCount: post.likes.length,
    attendeeCount: post.attendees.length,
    isLikedByMe: currentUserId
      ? post.likes.some((like) => like.userId === currentUserId)
      : false,
    likes: undefined,
    attendees: undefined,
  }))
}

export async function getPostById(id: string, currentUserId?: string) {
  const post = await db.query.PostTable.findFirst({
    where: and(eq(PostTable.id, id), wherePublicPosts),
    with: {
      likes: true,
      attendees: true,
    },
  })

  if (!post) return null

  return {
    ...post,
    displayDate: post.createdAt.toLocaleDateString(),
    likeCount: post.likes.length,
    isLikedByMe: currentUserId
      ? post.likes.some((like) => like.userId === currentUserId)
      : false,
    attendeeCount: post.attendees.length,
    goingCount: post.attendees.filter(
      (attendee) => attendee.status === postAttendeeStatuses[0],
    ).length,
    interestedCount: post.attendees.filter(
      (attendee) => attendee.status === postAttendeeStatuses[1],
    ).length,
    myAttendeeStatus:
      post.attendees.find((attendee) => attendee.userId === currentUserId)
        ?.status ?? null,
  }
}

export async function getPostForEdit(id: string) {
  return await db.query.PostTable.findFirst({
    where: eq(PostTable.id, id),
  })
}
