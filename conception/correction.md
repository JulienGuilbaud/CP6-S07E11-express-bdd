# Correction

## MCD

![mcd](./mcd-schema-final.svg)

## MLD

user (id, email, password, firstname, lastname)  
car (id, brand, model, power, zero_to_100, max_speed, eco_class, price, #agency_id)  
agency (id, email, address, phone_number)  
car_has_user (id, #user_id, #car_id, date_start, date_end)  

## MPD

user (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  firstname TEXT,
  lastname TEXT
)  

car (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  brand TEXT,
  model TEXT NOT NULL,
  power SMALLINT,
  zero_to_100 SMALLINT,  
  max_speed SMALLINT,
  eco_class TEXT,
  price INTEGER,
  agency_id INTEGER REFERENCES agency(id) NOT NULL
)

agency (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT,
  address TEXT NOT NULL,
  phone_number TEXT
)  

car_has_user (
  id INTEGER INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER REFERENCES user(id) NOT NULL,
  car_id INTEGER REFERENCES car(id) NOT NULL,
  date_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  date_end TIMESTAMPTZ
)
