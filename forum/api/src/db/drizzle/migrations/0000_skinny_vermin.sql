CREATE TYPE "public"."post_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."post_type" AS ENUM('event', 'discussion', 'announcement');--> statement-breakpoint
CREATE TYPE "public"."post_attendee_status" AS ENUM('going', 'interested', 'not_going');--> statement-breakpoint
CREATE TABLE "posts_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"type" "post_type" NOT NULL,
	"image_url" text,
	"status" "post_status" NOT NULL,
	"location_name" text,
	"latitude" double precision,
	"longitude" double precision,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "post_likes_table" (
	"post_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_likes_table_user_id_post_id_pk" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
CREATE TABLE "post_attendees_table" (
	"post_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"status" "post_attendee_status" DEFAULT 'not_going' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_attendees_table_user_id_post_id_pk" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
ALTER TABLE "post_likes_table" ADD CONSTRAINT "post_likes_table_post_id_posts_table_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_attendees_table" ADD CONSTRAINT "post_attendees_table_post_id_posts_table_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts_table"("id") ON DELETE cascade ON UPDATE no action;