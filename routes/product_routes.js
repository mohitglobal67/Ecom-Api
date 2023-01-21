const express = require("express");
const product_routes = express();
const bodyParser = require("body-parser");
product_routes.use(bodyParser.json());
product_routes.use(bodyParser.urlencoded({ extended: true }))
const auth = require("../middleware/auth");

const multer = require("multer");
const path = require("path");


const product_controller = require("../controllers/product_controller")
product_routes.use("/banner", express.static("public/banners"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/banners'));
    },

    filename: function (req, file, cb) {

        const name = Date.now() + file.originalname;
        cb(null, name, function (error1, success1) {
            if (error1) throw error1;
        });
    }
});


var upload = multer({ storage: storage })


product_routes.post("/add-product", upload.array("images", 5), product_controller.add_product);
product_routes.get("/get-product", product_controller.get_product);

module.exports = product_routes