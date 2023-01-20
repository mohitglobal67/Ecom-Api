
const express = require("express");
require('dotenv').config();


const app = express();
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000;
 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

mongoose.connection.on('err', err => {
    console.log("connection failed");
});

mongoose.connection.on('connected', connected => {
    console.log("connection Success ");
})
const user_routes = require('./routes/user_routes')

const store_routes = require('./routes/store_routes')

const category_routes = require('./routes/category_routes')

const banner_routes = require('./routes/banner_routes')

const subCategory_routes = require('./routes/subcategory_routes')

const product_routes = require('./routes/product_routes')

const http = require('http');


const server = http.createServer(app);





// app.use(cors({ origin: "http://localhost:3000/" }));

app.use('/api', user_routes);
app.use('/api', store_routes);
app.use('/api', category_routes);
app.use('/api', banner_routes);
app.use('/api', subCategory_routes);
app.use('/api', product_routes);


server.listen(PORT, console.log(3000));





