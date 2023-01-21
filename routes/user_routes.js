const express = require("express");

const user_routes = express();
const bodyparser = require('body-parser');

const multer = require("multer");
const path = require('path')

user_routes.use(bodyparser.json());

user_routes.use(bodyparser.urlencoded({ extended: true }))


user_routes.use(express.static("public"));

const fileupload = require('express-fileupload');

const fs = require('fs');

const user_controller = require('../controllers/user_controller')

//user_routes.use("/userimage", express.static("public/userimages"));


const auth = require('../middleware/auth')

// user_routes.use(express.static(__dirname));

// user_routes.use(fileupload({
//     useTempFiles: true
// }))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if (!fs.existsSync('/var/task/routes/temp', fs.constants.W_OK | fs.constants.R_OK)) {

            try {
                fs.accessSync('/var/task/routes/temp', fs.constants.W_OK | fs.constants.R_OK);
                console.log('can write %s', path);
            }
            catch (err) {
                console.log("%s doesn't exist", path);
            }
        }
        cb(null, './var/task/routes/temp');
    },

    filename: function (req, file, cb) {

        // const name = Date.now() + ' - ' + file.originalname;
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
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


