require("dotenv").config();
const mongoose = require("mongoose");

const Customer = require("../models/customerModel");
const fs = require("fs");
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("Connection to database success");
  });

const customers = JSON.parse(fs.readFileSync("./data/customers.json", "utf8"));

const importData = async () => {
  try {
    await Customer.create(customers);
  } catch (error) {
    console.log(error);
  }

  process.exit()
};

const clearData = async () => {
  try {
    await Customer.deleteMany();
    console.log("Customer deleted");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};


if(process.argv[2] == "--import") {
    importData();
}else if(process.argv[2] == "--delete"){
    clearData();
}