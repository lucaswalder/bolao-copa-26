CREATE TABLE "champion_picks" (
	"user_id" text PRIMARY KEY NOT NULL,
	"team" text NOT NULL,
	"bonus_points" integer NOT NULL,
	"phase_label" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "champion_picks" ADD CONSTRAINT "champion_picks_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;