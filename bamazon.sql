DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(25, 2) NULL,
  stock INT(100) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Game of Thrones: Season 1-7", "Movies & TV", 149.99, 50), 
		("Game of Thrones Paperback Collection", "Books", 38.99, 100), 
		("The North Remembers T-Shirt", "Clothing", 14.95, 25), 
		("Mother of Dragons Sweater", "Clothing", 19.99, 40),
		("Hand of the Queen Pin", "Jewelry", 12.99, 15),
		("Telltale Series: Game of Thrones for PS4", "Video Games", 22.95, 75),
		("House Targaryen Pendant Necklace", "Jewelry", 11.99, 30),
		("Telltale Series: Game of Thrones for Xbox", "Clothing", 19.99, 60),
		("I Drink and I Know Things: Beer Glasses", "Kitchen", 13.99, 80), 
		("Funko POP Jon Snow Action Figure", 'Toys', 10.99, 50);