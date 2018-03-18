drop table if exists users, journals;

CREATE TABLE users (
    id serial primary key not null,
    userName varchar(50) not null,
    userPass varchar(50) not null
);

CREATE TABLE journals (
    id serial primary key not null,
    entry text not null,
    userId int references users not null
);

INSERT INTO users (userName, userPass)
VALUES ('jjreed', 'willSaltPassLater');

INSERT INTO journals (entry, userId)
VALUES ('Hello World', '1');

GRANT SELECT, INSERT, UPDATE, DELETE ON users, journals TO nodeuser;