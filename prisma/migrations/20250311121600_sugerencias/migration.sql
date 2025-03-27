-- CreateTable
CREATE TABLE "Suggestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "idUserCreator" INTEGER NOT NULL,
    "idPainting" INTEGER,
    CONSTRAINT "Suggestion_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Suggestion_idPainting_fkey" FOREIGN KEY ("idPainting") REFERENCES "Paintings" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
