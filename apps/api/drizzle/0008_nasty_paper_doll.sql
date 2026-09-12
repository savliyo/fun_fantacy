ALTER TABLE "premiumMatchUser" ADD COLUMN "paymentMeta" json;--> statement-breakpoint
ALTER TABLE "premiumMatchUser" DROP COLUMN IF EXISTS "amount";