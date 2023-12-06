
\c project

create table Test(
    username varchar(255),
    password varchar(255),
    email varchar(255)
);

-- insert into test (username, password, email) values ('peter chan', '000', 'peterchan@gmail.com');

create table users(
    id SERial primary key,
    username varchar(255)not null ,
    password varchar(255)not null,
    email varchar(255)not null,
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);
create table product (
    id SERial primary key,
    name varchar(255)not null,
    brand varchar(255)not null,
    material varchar(255)not null,
    category_id varchar(255)not null,
    image varchar(255)not null,
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);
create table product_variant(
    id SERial primary key,
    color varchar(255)not null,
    size varchar(255)not null,
    thickness varchar(255)not null,
    unit_price varchar(255)not null,
    storage_count varchar(255)not null,
    product_id varchar(255)not null,
    image varchar(255)not null,
    created_at timestamp default NOW(),
    updated_at timestamp default NOW()
);
create table category(
    id SERial primary key,
    name varchar(255)not null,
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
    total varchar(255)not null,
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

