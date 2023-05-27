-- CreateTable
CREATE TABLE "procedures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "procedure_week_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "procedure_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "procedure_week_days_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "procedures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "day_procedures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "procedure_id" TEXT NOT NULL,
    CONSTRAINT "day_procedures_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "day_procedures_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "procedures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "procedure_week_days_procedure_id_week_day_key" ON "procedure_week_days"("procedure_id", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "day_procedures_day_id_procedure_id_key" ON "day_procedures"("day_id", "procedure_id");
