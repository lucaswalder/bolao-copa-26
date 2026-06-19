CREATE TABLE "ranking_snapshots" (
	"user_id" text PRIMARY KEY NOT NULL,
	"position" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "x1_challenges" (
	"id" text PRIMARY KEY NOT NULL,
	"match_id" text NOT NULL,
	"challenger_id" text NOT NULL,
	"opponent_id" text NOT NULL,
	"stake" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ranking_snapshots" ADD CONSTRAINT "ranking_snapshots_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "x1_challenges" ADD CONSTRAINT "x1_challenges_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "x1_challenges" ADD CONSTRAINT "x1_challenges_challenger_id_user_id_fk" FOREIGN KEY ("challenger_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "x1_challenges" ADD CONSTRAINT "x1_challenges_opponent_id_user_id_fk" FOREIGN KEY ("opponent_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "x1_match_idx" ON "x1_challenges" USING btree ("match_id");