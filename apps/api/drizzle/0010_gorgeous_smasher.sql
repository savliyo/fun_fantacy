CREATE TABLE IF NOT EXISTS "dreamer_customerFcm" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerID" integer NOT NULL,
	"token" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dreamer_customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"deviceID" text NOT NULL,
	"device" text DEFAULT 'android',
	"walletAmount" integer DEFAULT 5,
	CONSTRAINT "dreamer_customer_deviceID_unique" UNIQUE("deviceID")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dreamer_customerFcm" ADD CONSTRAINT "dreamer_customerFcm_customerID_dreamer_customer_id_fk" FOREIGN KEY ("customerID") REFERENCES "public"."dreamer_customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
