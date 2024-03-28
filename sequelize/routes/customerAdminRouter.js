const router = require('express').Router();

const CustomerAdmin = require("../controllers/customerAdminController");

router.get("/",CustomerAdmin.customerPage);
router.get("/create",CustomerAdmin.createCustomerPage);
router.post("/admin/create", CustomerAdmin.createCustomer); 
router.get("/edit/:id", CustomerAdmin.editCustomerPage); 
router.post("/admin/edit/:id", CustomerAdmin.editCustomer); 

module.exports = router;