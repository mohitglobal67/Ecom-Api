const express = require("express");
const banner_routes = express();
const bodyParser = require("body-parser");
banner_routes.use(bodyParser.json());
banner_routes.use(bodyParser.urlencoded({ extended: true }))
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
banner_routes.use(express.static('public'))

const banner_controller = require("../controllers/banner_controller")
banner_routes.use("/banner", express.static("public/banners"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'https://powerful-tweed-jacket-newt.cyclic.app/../public/banners'));
    },

    filename: function (req, file, cb) {

        const name = Date.now() + file.originalname;
        cb(null, name, function (error1, success1) {
            if (error1) throw error1;
        });
    }
});


var upload = multer({ storage: storage })

banner_routes.post("/banner", upload.array("banner", 5), banner_controller.banner);

banner_routes.get("/banner", banner_controller.bannerget);




module.exports = banner_routes