require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");
const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useNewUrlParser: true,
}).then((con) => {
  console.log("Connection to database success")
});


app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
