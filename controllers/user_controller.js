const user = require('../models/user_model');

const bcryptjs = require('bcryptjs');

const config = require('../config/config')

const jwt = require('jsonwebtoken');




const securePassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);

        return passwordHash;

    } catch (error) {
        res.status(400).send(error.message);
    }
}


const create_token = async (id) => {
    try {

        const token = await jwt.sign({ _id: id }, config.secret_jwt);

        return token;
    } catch (error) {

        res.status(400).send(error.message);

    }
}



const register_user = async (req, res) => {


    try {

        const spassword = await securePassword(req.body.password);

        const user_save = new user({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            phone: req.body.phone,
            //image: req.file.filename,
            type: req.body.type,
        });

        const user_data = await user.findOne({ email: req.body.email });

        if (user_data) {


            res.status(200).send({
                success: false, msg: "email already exit"
            })

        } else {

            const user_data = await user_save.save();

            res.status(200).send({
                success: true, data: user_data
            })

        }



    } catch (error) {
        res.status(400).send(error.message);

    }
}

//login Api

const user_login = async (req, res) => {


    try {

        const email = req.body.email;
        const password = req.body.password;

        const user_Data = await user.findOne({ email: email });

        if (user_Data) {

            const passwordMatch = await bcryptjs.compare(password, user_Data.password);

            if (passwordMatch) {
                const tokenData = await create_token(user_Data._id)
                const userResult = {
                    _id: user_Data.id,
                    name: user_Data.name,
                    email: user_Data.email,
                    password: user_Data.password,
                    image: user_Data.image,
                    phone: user_Data.phone,
                    type: user_Data.type,
                    token: tokenData,
                }

                const Response = {
                    success: true,
                    msg: "user details",
                    data: userResult


                }
                res.status(200).send(Response);

            } else {
                res.status(200).send({ success: false, msg: "login details incorrect" })
            }

        } else {
            res.status(200).send({ success: false, msg: "login details incorrect" })
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


const update_password = async (req, res) => {

    try {

        const user_id = req.body.user_id
        const password = req.body.password

        const data = await user.findOne({ _id: user_id })


        if (data) {

            const newPassword = await securePassword(password);

            const userData = await user.findByIdAndUpdate({ _id: user_id }, { $set: { password: newPassword } });

            res.status(200).send({ success: true, msg: "Password update succesfully" })

        } else {
            res.status(200).send({ success: false, msg: "User id Not Found" })
        }

    } catch (error) {
        res.status(400).send(error.message);

    }

}



module.exports = {
    register_user,
    user_login,
    update_password
}