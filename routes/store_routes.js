const express = require("express");
const store_route = express();
const bodyParser = require("body-parser");
store_route.use(bodyParser.json());
store_route.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
const path = require("path");
store_route.use(express.static('public'));

const auth = require('../middleware/auth')


const storage_controller = require('../controllers/store_controller')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/storeimages'));
    },

    filename: function (req, file, cb) {

        const name = Date.now() + file.originalname;
        cb(null, name, function (error1, success1) {
            if (error1) throw error1;
        });
    }
});


var upload = multer({ storage: storage })



store_route.post('/create-store', auth, upload.single('logo'), storage_controller.create_store);


module.exports = store_route;