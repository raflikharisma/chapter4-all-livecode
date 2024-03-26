const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can't be empty!"],
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true
  },
  photo: {
    type: String,
    default: "user-default.jpg",
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Customer = mongoose.model("Customer", customerSchema);

// const customerTest = new Customer({
//   name: "rafli kharisma",
//   email: "goypunjoungg@gmaial.com",
//   phoneNumber: "07878781",
// });

// customerTest
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("err" + err);
//   });

  module.exports = Customer;
