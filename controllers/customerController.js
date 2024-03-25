const fs = require("fs");
const Customer = require("./../models/customerModel");

const getAllData = async (req, res, next) => {
  try {
    const queryObject = {...req.query};
    const excludedColumn = [`page`, `sort`, `limit`, `fields`];
    excludedColumn.forEach((el) => delete queryObject[el])

    console.log(req.query), queryObject;

    const customerData = await Customer.find(queryObject);
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
