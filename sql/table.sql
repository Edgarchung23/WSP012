drop database "wsp-012";
create database "wsp-012";

\c "wsp-012"

-- create table test (
--     id serial primary key,
--     Fullname varchar(255),
--     Username varchar(255) UNIQUE,
--     Email varchar(255) UNIQUE,
--     PhoneNumber varchar(255),
--     Password varchar(255),
--     confirmPassword varchar(255)
-- );

create table users(
    id SERial primary key,
    Fullname varchar(255) not null,
    Username varchar(255)not null UNIQUE,
    Email varchar(255) not null,
    Phonenumber varchar(255) not null,
    Password varchar(255)not null,
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);

create table product_variant(
    id SERial primary key,
    color varchar(255)not null,
    size varchar(255)not null,
    unit_price varchar(255)not null,
    thickness varchar(255)not null,
    storage_count varchar(255)not null,
    product_id varchar(255)not null,
    image varchar(255)not null,
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);

create table category(
    id SERial primary key,
    name varchar(255)not null UNIQUE, 
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);

create table product (
    id SERial primary key,
    name varchar(255)not null UNIQUE,
    brand varchar(255)not null,
    category_id integer not null,
    unit_price varchar(255)not null,
    material varchar(255)not null,
    image varchar(255)not null,
    FOREIGN KEY (category_id) REFERENCES category(id),
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);
create table shopping_cart(
    id SERial primary key,
    user_id varchar(255)not null,
    product_id varchar(255)not null,
    product_variant_id varchar(255)not null,
    quantity varchar(255)not null,
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);

create table receipt(
    id SERial primary key,
    total varchar(255)not null ,
    user_id varchar(255)not null,
    stripe_idv varchar(255)not null,
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);
create table receipt_subitem(
    id SERial primary key,
    product_variant_id varchar(255)not null,
    unit_price varchar(255)not null,
    quantity varchar(255)not null,
    subtotal varchar(255)not null,
    receipt_id varchar(255)not null,
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);




