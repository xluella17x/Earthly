import { db } from "./db"
import { PostTable, PostLikeTable, PostAttendeeTable } from "./schema"

async function main() {
  console.log("Seeding database...")

  const userId = "test-user-id"

  try {
    console.log("Inserting Post...")
    const [post] = await db
      .insert(PostTable)
      .values({
        userId,
        title: "First Earthly Event",
        description: "This is a test event created by the seed script.",
        type: "event",
        status: "published",
        locationName: "London, UK",
      })
      .returning()

    console.log(`Post created: ${post.id}`)

    console.log("Adding Like...")
    await db.insert(PostLikeTable).values({
      postId: post.id,
      userId: "other-user-123",
    })
    console.log("Like added")

    console.log("Adding Attendee...")
    await db.insert(PostAttendeeTable).values({
      postId: post.id,
      userId: userId,
      status: "going",
    })
    console.log("Attendee added")
    console.log("Seeding complete!")
    process.exit(0)
  } catch (error) {
    console.error("Seeding Failed:", error)
    process.exit(1)
  }
}

main()
