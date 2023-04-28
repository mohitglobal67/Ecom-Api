const express = require('express');
const subCategory_routes = express();

const bodyParser = require("body-parser");

subCategory_routes.use(bodyParser.json());
subCategory_routes.use(bodyParser.urlencoded({ extended: true }));

const auth = require("../middleware/auth")

const multer = require("multer");
const path = require("path");
const Subcategory_controller = require('../controllers/subCategory_controller')


subCategory_routes.post("/add-subCategory/:id", Subcategory_controller.create_subCategory)


subCategory_routes.get("/add-subCategory", Subcategory_controller.categorybyid)

module.exports = subCategory_routes;