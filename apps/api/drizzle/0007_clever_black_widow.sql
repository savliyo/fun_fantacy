CREATE TABLE IF NOT EXISTS "premiumMatchUser" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerID" integer NOT NULL,
	"matchID" integer NOT NULL,
	"amount" integer NOT NULL,
	"paymentID" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "match" ADD COLUMN "premiumTeamPrice" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "premiumMatchUser" ADD CONSTRAINT "premiumMatchUser_customerID_customer_id_fk" FOREIGN KEY ("customerID") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "premiumMatchUser" ADD CONSTRAINT "premiumMatchUser_matchID_match_id_fk" FOREIGN KEY ("matchID") REFERENCES "public"."match"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
