ALTER TABLE "premiumMatchUser" ALTER COLUMN "matchID" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "premiumMatchUser" ADD COLUMN "subsType" text;--> statement-breakpoint
ALTER TABLE "premiumMatchUser" ADD COLUMN "startDate" timestamp;--> statement-breakpoint
ALTER TABLE "premiumMatchUser" ADD COLUMN "endDate" timestamp;