const { Customer } = require("../models");

const customerPage = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.render("customers/index.ejs", {
      customers,
      message: req.flash("message", ""),
    });
  } catch (error) {
    res.render("error.ejs"),
      {
        message: error.message,
      };
  }
};

const createCustomerPage = async (req, res) => {
  try {
    res.render("customers/create.ejs");
  } catch (error) {
    res.render("error.ejs"),
      {
        message: error.message,
      };
  }
};

const createCustomer = async (req, res) => {
  try {
    await Customer.create(req.body);
    req.flash("message", "Ditambah");
    res.redirect("/customers");
  } catch (error) {
    console.log(error);
  }
};

const editCustomerPage = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    req.flash("message", "diedit");
    res.render("customers/edit.ejs", { customer });
  } catch (error) {
    console.log(error);
  }
};
const editCustomer = async (req, res) => {
  try {
    await Customer.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/customers");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  customerPage,
  createCustomerPage,
  createCustomer,
  editCustomerPage,
  editCustomer,
};
