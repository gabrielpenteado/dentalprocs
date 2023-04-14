-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_day_procedures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "procedure_id" TEXT NOT NULL,
    CONSTRAINT "day_procedures_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "day_procedures_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "procedures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_day_procedures" ("day_id", "id", "procedure_id") SELECT "day_id", "id", "procedure_id" FROM "day_procedures";
DROP TABLE "day_procedures";
ALTER TABLE "new_day_procedures" RENAME TO "day_procedures";
CREATE UNIQUE INDEX "day_procedures_day_id_procedure_id_key" ON "day_procedures"("day_id", "procedure_id");
CREATE TABLE "new_procedure_week_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "procedure_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "procedure_week_days_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "procedures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_procedure_week_days" ("id", "procedure_id", "week_day") SELECT "id", "procedure_id", "week_day" FROM "procedure_week_days";
DROP TABLE "procedure_week_days";
ALTER TABLE "new_procedure_week_days" RENAME TO "procedure_week_days";
CREATE UNIQUE INDEX "procedure_week_days_procedure_id_week_day_key" ON "procedure_week_days"("procedure_id", "week_day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
