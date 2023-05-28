-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "new_in" INTEGER,
    "new_out" INTEGER,
    "old_in" INTEGER,
    "old_out" INTEGER,
    "groupId" INTEGER NOT NULL,
    "systemId" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "group" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "System" (
    "id" SERIAL NOT NULL,
    "system" TEXT NOT NULL,

    CONSTRAINT "System_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_new_in_key" ON "Link"("new_in");

-- CreateIndex
CREATE UNIQUE INDEX "Link_new_out_key" ON "Link"("new_out");

-- CreateIndex
CREATE UNIQUE INDEX "Link_old_in_key" ON "Link"("old_in");

-- CreateIndex
CREATE UNIQUE INDEX "Link_old_out_key" ON "Link"("old_out");

-- CreateIndex
CREATE UNIQUE INDEX "Group_group_key" ON "Group"("group");

-- CreateIndex
CREATE UNIQUE INDEX "System_system_key" ON "System"("system");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
