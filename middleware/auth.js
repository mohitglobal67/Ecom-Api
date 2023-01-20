
const jwt = require('jsonwebtoken')

const config = require('../config/config')



const veryfyToken = async (req, res, next) => {

    const headertoken = req.headers["authorization"];

    const barertoken = headertoken.split(' ');

    const token = barertoken[1];

    //const token = req.query.token || req.body.token  || req.headers["authorization"];

    if (!token) {
        res.status(200).send({ succes: false, msg: "token requires" })
    } try {
        const decode = jwt.verify(token, config.secret_jwt);
        req.user = decode;
    } catch (error) {
        res.status(400).send("Invalid token")
    }
    return next();
}


module.exports = veryfyToken