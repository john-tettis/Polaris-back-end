
-- from the terminal run:
-- psql < polaris.sql
\c postgres
DROP DATABASE IF EXISTS polaris;

CREATE DATABASE polaris;

\c polaris
CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username varchar(100) NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  password varchar(100) NOT NULL,
  def_location varchar(100)
);

CREATE TABLE constellations
(
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  image_url text NOT NULL,
  astro_sign varchar(50)
  
);


CREATE TABLE saved_constellations
(
  user_id INTEGER NOT NULL REFERENCES users(id),
  constell_id INTEGER NOT NULL REFERENCES constellations(id),
  primary key (user_id,constell_id)

);
insert into users(username,first_name,last_name,email,password)
VALUES('test_user', 'User','Test','testemail@gmail.com',123456)