/*
  Warnings:

  - Added the required column `idUserCreator` to the `Paintings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paintings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "contactEmail" TEXT,
    "published" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" DATETIME NOT NULL,
    "idCategory" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "idUserCreator" INTEGER NOT NULL,
    CONSTRAINT "Paintings_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Paintings_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Paintings" ("active", "author", "contactEmail", "createdAt", "description", "expired", "id", "idCategory", "published", "title", "updateAt") SELECT "active", "author", "contactEmail", "createdAt", "description", "expired", "id", "idCategory", "published", "title", "updateAt" FROM "Paintings";
DROP TABLE "Paintings";
ALTER TABLE "new_Paintings" RENAME TO "Paintings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
