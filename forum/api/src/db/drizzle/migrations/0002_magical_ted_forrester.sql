CREATE TYPE "public"."post_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."post_attendee_status" AS ENUM('going', 'interested', 'not_going');--> statement-breakpoint
ALTER TABLE "post_attendees_table" ALTER COLUMN "status" SET DEFAULT 'not_going'::"public"."post_attendee_status";--> statement-breakpoint
ALTER TABLE "post_attendees_table" ALTER COLUMN "status" SET DATA TYPE "public"."post_attendee_status" USING "status"::"public"."post_attendee_status";--> statement-breakpoint
ALTER TABLE "posts_table" ADD COLUMN "status" "post_status" NOT NULL;--> statement-breakpoint
ALTER TABLE "posts_table" ADD COLUMN "deletedAt" timestamp with time zone;