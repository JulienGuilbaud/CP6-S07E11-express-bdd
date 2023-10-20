BEGIN;

DROP TABLE IF EXISTS "user", "car", "agency", "car_has_user";

CREATE TABLE "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "firstname" TEXT,
  "lastname" TEXT
);  

CREATE TABLE "agency" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT,
  "address" TEXT NOT NULL,
  "phone_number" TEXT
);

CREATE TABLE "car" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "brand" TEXT,
  "model" TEXT NOT NULL,
  "power" SMALLINT,
  "zero_to_100" SMALLINT,  
  "max_speed" SMALLINT,
  "eco_class" TEXT,
  "price" INTEGER,
  "agency_id" INTEGER REFERENCES "agency"("id") NOT NULL
);

CREATE TABLE "car_has_user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INTEGER REFERENCES "user"("id") NOT NULL,
  "car_id" INTEGER REFERENCES "car"("id") NOT NULL,
  "date_start" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "date_end" TIMESTAMPTZ
);

COMMIT;