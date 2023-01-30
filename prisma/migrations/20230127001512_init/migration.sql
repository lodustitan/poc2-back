-- CreateTable
CREATE TABLE "idols" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "type" VARCHAR(40) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "idols_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market" (
    "id" SERIAL NOT NULL,
    "idol_id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "market_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "account_name" VARCHAR(30) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "diamonds" INTEGER NOT NULL DEFAULT 0,
    "peanuts" INTEGER NOT NULL DEFAULT 0,
    "nickname" CHAR(35),

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_idol_id_key" ON "market"("idol_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_account_name_key" ON "users"("account_name");

-- AddForeignKey
ALTER TABLE "idols" ADD CONSTRAINT "idols_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "market" ADD CONSTRAINT "market_fk0" FOREIGN KEY ("idol_id") REFERENCES "idols"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "market" ADD CONSTRAINT "market_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
