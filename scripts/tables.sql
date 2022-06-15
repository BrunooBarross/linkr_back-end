CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	"userName" TEXT NOT NULL,
	picture TEXT NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions(
	id SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULl REFERENCES "users"("id"),
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE posts(
	id SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	link TEXT NOT NULL,
	text TEXT,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE likes(
	id SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE hashtags (
	id SERIAL PRIMARY KEY,
	hashtag TEXT NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtagRelation"(
	id SERIAL PRIMARY KEY,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"hashtagId" INTEGER NOT NULL REFERENCES "hashtags"("id")
);
