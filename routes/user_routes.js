const express = require("express");

const user_routes = express();
const bodyparser = require('body-parser');

const multer = require("multer");
const path = require('path')

user_routes.use(bodyparser.json());

user_routes.use(bodyparser.urlencoded({ extended: true }))


user_routes.use(express.static("public"));

const user_controller = require('../controllers/user_controller')


const auth = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/var/task/../public/userimages'));
    },

    filename: function (req, file, cb) {

        const name = Date.now() + ' - ' + file.originalname;
        cb(null, name, function (error1, success1) {
            if (error1) throw error1;
        });
    }
});




var upload = multer({ storage: storage })


user_routes.post('/register', upload.single('image'), user_controller.register_user);

user_routes.post('/login', user_controller.user_login);



user_routes.get('/test', auth, function (req, res) {
    res.status(200).send({ seccess: true, msg: "verified" })
});

user_routes.post('/update-password', auth, user_controller.update_password);
module.exports = user_routes;


