CREATE TABLE IF NOT EXISTS "config" (
	"id" serial PRIMARY KEY NOT NULL,
	"adBannerID" text NOT NULL,
	"adRewardID" text NOT NULL,
	"privacyPolicy" text NOT NULL,
	"telegramLink" text NOT NULL,
	"aboutUs" text NOT NULL
);
