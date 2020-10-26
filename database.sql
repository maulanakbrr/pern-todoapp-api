CREATE DATABASE perntodo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE todo(
    todo_uid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    description VARCHAR(255)
);

