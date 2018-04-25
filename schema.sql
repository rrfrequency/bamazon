DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE	bamazon;

USE bamazon;

CREATE TABLE products(
	id int auto_increment NOT NULL,
	item_id integer(255) NOT NULL ,
    product_name VARCHAR (50) NOT NULL ,
    department_name VARCHAR(50)  NOT NULL,
    price float NOT NULL,
    stock_quantity float  NOT NULL,
	primary key (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
	VALUES
	(1, 'Xbox', 'Electronics', 150.99, 20 ),
	(2, 'Mac Book Pro', 'Electronics', 1400.99, 20 ),
	(3, 'Ready Player One', 'Books', 8.99, 20 ),
	(4, 'Dune' , 'Books', 4.99, 20 ),
	(5, 'Lord of the Rings', 'Books', 9.99, 20 ),
	(6, 'Beats Audio', 'Electronics', 99.99, 20 ),
	(7, 'Levis Jeans', 'Clothes', 199.99, 20 ),
	(8, 'Cardigan', 'Clothes', 29.99, 20 ),
	(9, 'Boxer Briefs', 'Clothes', 3.99, 20 ),
	(10, 'Switch', 'Electronics', 89.99, 20 );
    
select * from products;