import { db } from "./db"
import { PostTable, PostLikeTable, PostAttendeeTable } from "./schema"
import { sql } from "drizzle-orm"

async function reset() {
  console.log("Cleaning database...")
  await db.delete(PostTable)

  console.log("Database is empty.")
  process.exit(0)
}

reset()