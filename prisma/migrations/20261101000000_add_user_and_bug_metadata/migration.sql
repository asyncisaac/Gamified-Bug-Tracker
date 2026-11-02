PRAGMA foreign_keys=OFF;

CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "avatar" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

INSERT INTO "new_User" ("id", "name", "level", "xp")
SELECT "id", "name", "level", "xp" FROM "User";

CREATE TABLE "new_Bug" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "points" INTEGER NOT NULL DEFAULT 1,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "closedAt" DATETIME,
    CONSTRAINT "Bug_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_Bug" ("id", "title", "description", "status", "points", "userId")
SELECT "id", "title", "description", "status", "points", "userId" FROM "Bug";

DROP TABLE "Bug";
DROP TABLE "User";

ALTER TABLE "new_User" RENAME TO "User";
ALTER TABLE "new_Bug" RENAME TO "Bug";

PRAGMA foreign_keys=ON;

