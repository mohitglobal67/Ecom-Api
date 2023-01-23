const express = require("express");

const user_routes = express();
const bodyparser = require('body-parser');

const multer = require("multer");
const path = require('path')

user_routes.use(bodyparser.json());

const fs = require('fs')

user_routes.use(bodyparser.urlencoded({ extended: true }))


user_routes.use(express.static("public"));

const fileupload = require('express-fileupload');

const user_controller = require('../controllers/user_controller')

user_routes.use("/userimage", express.static("public/userimages"));


const auth = require('../middleware/auth')

user_routes.use(express.static(__dirname));


user_routes.use(express.static(`${__dirname}/public`))

// user_routes.use(fileupload({
//     useTempFiles: true
// }))


const multerorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },



    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null,
            `userimages-${file.fieldname}-${Date.now()}.${ext}`)
    }
});


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join("/temp/public/userimages"));
//     },

//     filename: function (req, file, cb) {

//         // fs.writeFileSync(__dirname + "/../users.json", JSON.stringify(users))

//         const name = Date.now() + ' - ' + file.originalname;
//         cb(null, name, function (error1, success1) {
//             if (error1) throw error1;
//         });
//     }

// });




var upload = multer({ storage: multerorage })


user_routes.post('/register', upload.single('image'), user_controller.register_user);

user_routes.post('/login', user_controller.user_login);



user_routes.get('/test', auth, function (req, res) {
    res.status(200).send({ seccess: true, msg: "verified" })
});

user_routes.post('/update-password', auth, user_controller.update_password);
module.exports = user_routes;






// // Calling all the required packages const express = require('express'); const bodyParser = require("body-parser"); const path = require('path');
// const multer = require('multer');
// const File = require('./model/fileSchema');
// const app = express();
// // Configurations for "body-parser" app.use(
// );
// bodyParser.urlencoded({
//     extended: true,
// })
// // Configurations for "Static-files" app.set("view engine", 'ejs')
// app.set('views', path.join(__dirname, 'views'))
// app.use(express.static(`${__dirname}/public`))
// //Configuration for Multer
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//     },
//     cb(null, 'public');


//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1]
//         cb(null,
//             `files/admin-${file.fieldname}-${Date.now()}.${ext}`)
//     }
// });
// // Multer Filter
// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.split('/')[1]
// cb(null, true)
// }else {
// }
// };
// 'pdf' ) {
//     cb(new Error('Not a PDF File!!'), false)
//     //Calling the "multer" Function
//     const upload = multer({
//         storage: multerStorage,
//         fileFilter: multerFilter
//     });
//     //API Endpoint for uploading file
//     app.post('/api/uploadFile', upload.single('myFile'), async (req, res) => {
//         // Stuff to be added later
//         //console.log(req.file)
//         try {
//             const newFile = await File.create({
//             })
//             name: req.file.filename
//             res.status(200).json({
//                 status: 'success',
//                 message: 'File created successfully!!'
//             });
//         } catch (error) {
//             res.json({
//                 error
//             });
//         }
//     });
//     // API Endpoint to render HTML file app.use('/', (req, res)=>{
// });
// res.status(200).render('index');
// //Express server
// module.exports = app