CREATE TABLE "user_cards" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"card_id" text NOT NULL,
	"acquired_round" text NOT NULL,
	"acquired_at" timestamp DEFAULT now() NOT NULL,
	"used_at" timestamp,
	"used_on_match_id" text
);
--> statement-breakpoint
ALTER TABLE "user_cards" ADD CONSTRAINT "user_cards_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_cards" ADD CONSTRAINT "user_cards_used_on_match_id_matches_id_fk" FOREIGN KEY ("used_on_match_id") REFERENCES "public"."matches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_cards_user_idx" ON "user_cards" USING btree ("user_id");