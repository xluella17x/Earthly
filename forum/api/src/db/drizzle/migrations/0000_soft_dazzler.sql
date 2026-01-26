CREATE TABLE "posts_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"type" text NOT NULL,
	"image_url" text,
	"location_name" text,
	"latitude" double precision,
	"longitude" double precision,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_likes_table" (
	"post_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "post_likes_table_user_id_post_id_pk" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
CREATE TABLE "post_attendees_table" (
	"post_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"status" text DEFAULT 'going' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "post_attendees_table_user_id_post_id_pk" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
ALTER TABLE "post_likes_table" ADD CONSTRAINT "post_likes_table_post_id_posts_table_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_attendees_table" ADD CONSTRAINT "post_attendees_table_post_id_posts_table_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts_table"("id") ON DELETE cascade ON UPDATE no action;