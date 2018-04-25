const mysql = require('mysql');
const Table = require('cli-table');
const inquirer = require("inquirer");

// connect to bamazon database
const connection = mysql.createConnection({
  host: "localhost",
  port: 8000,
  user: "root",
  password: "root",
  database: "bamazon"
});

let desiredId;
let desiredQuantity;
let quantity;
let price;

// show products table
function showProduct(){
	// table display
	let table = new Table({
		//table headers
	    head: ['Item ID', 'Item Name', 'Department', 'Price', 'Quantity']
	});
 	// access products from database
	connection.query("SELECT * FROM products", (err, res) => {
	    for (let i = 0; i < res.length; i++) {
	    	// push values from product table to CLI table
	    	table.push(
	        	[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
	      );
    }
    // show products to user
    console.log(table.toString());
    // run function to ask user for product ID
    askUserForId();
  })
}

// function to ask user for desired product ID
function askUserForId(){
	// prompt to get user input
	inquirer.prompt([{
		type: 'text',
		message: 'Enter the desired product ID',
		name: 'productId',

		}]).then((inquirerResponse) => {
				// save user's product choice
				desiredId = parseInt(inquirerResponse.productId); 
				// run function to get quantity of product from user
				askUserQuantity();
			}
  );
}

// function to ask user how many of the product they wish to purchase
function askUserQuantity(){
	// prompt to get user input for amount to purchase
 	inquirer.prompt([{
		type: 'text',
		message: 'How many would you like to buy?',
		name: 'quantityOfOrder',

		}]).then((inquirerResponse) => {
				// save user input of amount to purchase
				desiredQuantity = parseInt(inquirerResponse.quantityOfOrder);
				// run function to determine total price and update bamazon database
				runBamazon();
			}
 	);
 }

// function to dispay total price and update bamazon database
function runBamazon(){
	// access products table and get product that corresponds to the appropriate product ID
 	connection.query("SELECT * FROM products WHERE item_id =" + desiredId, (err, res) => {
 		// save stock quantity of desired product
 		quantity = res[0].stock_quantity;
 		// save price of desired product
 		price = res[0].price;
 		// if the desired quantity is less than the available stock then run the update table function
 		if(desiredQuantity < quantity){
 			updateTable();
 		}
 		// if desired quantity is more than available stock, notify user and end process
 		else{
 			console.log('Not Enough Stock!');
 			process.exit();
 		}
    });
 }

// function to update the database
function updateTable(){
	// new value of the available stock after user purchase is deducted
 	let value = quantity - desiredQuantity;
 	// access database to update
 	let query = connection.query(
 		// update product table: stock_quantity to value at item_Id
	    "UPDATE products SET ? WHERE ?",
	    [
	      {
	        stock_quantity: value
	      },
	      {
	        item_id: desiredId
	      }
	    ],
	    (err, res) => {
	    	// total price of user purchase saved to the hundredths decimal place
	    	let total = (price * desiredQuantity).toFixed(2);
	    	// display price of user purchase
	    	console.log('Your total is $' + total);
	    	// exit process
	    	process.exit();
	    }
	);
}

// run program
showProduct();