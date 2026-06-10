ALTER TABLE "matches" ADD COLUMN "home_penalty_score" integer;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "away_penalty_score" integer;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "winner_team" text;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "result_status" text DEFAULT 'scheduled' NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "result_source" text;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "result_confirmed_at" timestamp;