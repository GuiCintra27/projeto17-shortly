CREATE TABLE users(
    id SERIAL PRIMARY KEY,  
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE urls(
    id SERIAL PRIMARY KEY, 
    "userOwner" INTEGER NOT NULL,
    url TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "visitCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions(
    id SERIAL PRIMARY KEY, 
    token TEXT NOT NULL UNIQUE, 
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE "urls" ADD CONSTRAINT "urls_fk0" FOREIGN KEY ("userOwner") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");