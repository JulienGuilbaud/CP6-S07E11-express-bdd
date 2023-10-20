BEGIN;

TRUNCATE TABLE "agency", "car", "car_has_user", "user";

INSERT INTO "agency" ("email", "address", "phone_number") VALUES
  ('nantes@oto-rent.com', '214 Rue de Paris 44000 Nantes', '+33 1 23 45 67 89'),
  ('strasbourg@oto-rent.com', '214 Rue de Bordeaux 67000 Strasbourg', '+33 1 23 45 67 89'),
  ('lyon@oto-rent.com', '214 Rue de Rennes 69000 Lyon', '+33 1 23 45 67 89'),
  ('marseille@oto-rent.com', '214 Rue de Toulouse 13000 Marseille', '+33 1 23 45 67 89'),
  ('toulouse@oto-rent.com', '214 Rue de Vanne 31000 Toulouse', '+33 1 23 45 67 89'),
  ('bordeaux@oto-rent.com', '214 Rue de Caen 33000 Bordeaux', '+33 1 23 45 67 89'),
  ('la-rochelle@oto-rent.com', '214 Rue de Dunkerque 17000 La Rochelle', '+33 1 23 45 67 89');

COMMIT;