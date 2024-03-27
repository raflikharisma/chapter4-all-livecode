const fs = require("fs");
const Customer = require("./../models/customerModel");
const { request } = require("http");

const getAllData = async (req, res, next) => {
  try {
    const queryObject = { ...req.query };
    const excludedColumn = [`page`, `sort`, `limit`, `fields`];
    excludedColumn.forEach((el) => delete queryObject[el]);

    console.log(req.query), queryObject;

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(/\b(gte|lte|lte|lt)\b/g, (match) => `$${match}`); //=> $gt, $gte, $lte'
    queryString = JSON.parse(queryString);
    console.log(queryString);

    let query = Customer.find(queryString);

    //sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt");
    }

    //field limit
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-password -__v");
    }

    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      let numCustomers = await Customers.countDocument();
      if (skip > numCustomers) throw new Error("Page Doesnt exist");
    }

    const customerData = await query;
    res.status(200).json({
      status: "Success",
      totalData: customerData.length,
      data: {
        customers: customerData,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getDataById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customerData = await Customer.findById(id);
    res.status(200).json({
      status: "Success",
      data: {
        customers: customerData,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const createData = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);

    res.status(201).json({
      status: "Success",
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Successfully Updating data",
      customer: customer,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Successfully Deleting data",
      deletedData: customer,
    });
  } catch (error) {
    res.status(400).json({}).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getAllData,
  getDataById,
  createData,
  updateDataById,
  deleteDataById,
};
