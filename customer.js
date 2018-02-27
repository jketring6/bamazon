var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({

  host : 'localhost',
  port : 3306,

  user : 'root',

  password : 'titus',
  database : 'bamazon_DB'

});


connection.connect(function(err) {

  if (err) throw err;

  console.log("connected as id " + connection.threadId);

  productsTable();
});

function productsTable() {

  connection.query('SELECT * FROM products', function(err, res, fields) {

      if (err) throw err;

      var table = new Table({

        chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
             , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
             , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
             , 'right': '' , 'right-mid': '' , 'middle': ' ' },
        style: { 'padding-left': 0, 'padding-right': 0 },
        head: ['item id', 'product_name', 'department_name', 'price', 'stock'],
        colWidths: [10, 50, 15, 10, 10]

      });

    res.forEach(function(item) {

      numOfItems = res.length;

      table.push(
        [item['item_id'], item['product_name'], item['department_name'], item['price'], item['stock']]);
    });

    console.log(table.toString());

    buyProducts();

  });
}

function buyProducts() {

  inquirer.prompt([

    {
      type: "input",
      message: "What is the ID of the item you would like to purchase today?",
      name: "itemSelect"
    },
    {
      type: "input",
      message: "How many would you like?",
      name: "itemQuantity"
    }

    ]).then(function(res, err) {

      if (err) {
        console.log("Sorry, please select a valid item");
      }

      else {

      checkInventory(res.itemSelect, res.itemQuantity);

      }
    })
}

function checkInventory(itemID, itemQuantity) {

  connection.query('SELECT * FROM products WHERE item_id = ' + itemID, function(err, res) {

      if (err) throw err;

      if (itemQuantity <= res[0].stock) {

        var totalCost = res[0].price * itemQuantity;

        console.log('Thank you for your order!');

        console.log('Your total cost of ' + res[0].product_name + ' X ' + itemQuantity + ' is $' + totalCost);

        connection.query('UPDATE products SET stock = stock - ' + itemQuantity + ' WHERE item_id = ' + itemID);
      }

      else {

        console.log("We're sorry, we do not currently have enough supply to fulfill your order. Please try a smaller quantity or select a different item");

      }

      continueShopping();

  });
}

function continueShopping() {

  inquirer.prompt([

      {
        type: "list",
        message: "Continue shopping?",
        choices: ["Yes", "No"],
        name: "continueShopping"
      }

    ]).then(function(answer) {

      if (answer.continueShopping === "Yes") {

        buyProducts();

      }

      else {

        console.log("Thank you for shopping with us! Have a great day!")

        connection.end();

      }

    })

}