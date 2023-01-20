
const Productmodel = require("../models/product_mode")
const category_controller = require("../controllers/category_controller")
const store_controller = require("../controllers/store_controller")

const subCategory_controller = require("../controllers/subCategory_controller")




const add_product = async (req, res) => {

    try {

        var arrimages = [];

        for (var i = 0; i < req.files.length; i++) {
            arrimages[i] = req.files[i].filename;
        }


        var product = new Productmodel({
            vendor_id: req.body.vendor_id,
            store_id: req.body.store_id,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category_id: req.body.category_id,
            sub_cat_id: req.body.sub_cat_id,
            images: arrimages

        });

        const product_data = await product.save();


        res.status(200).send({ success: true, message: "Product details", data: product_data });

    } catch (error) {

        res.status(400).send({ success: false, message: error.message });

    }

}

const get_product = async (req, res) => {


    try {

        var send_data = [];
        var cat_data = await category_controller.get_category();

        //var subcat_data = await subCategory_controller.sub_category();

        if (cat_data.length > 0) {

            for (var i = 0; i < cat_data.length; i++) {
                var Product_data = [];

                var cat_id = cat_data[i]['_id'].toString();
                // var subcat_id = subcat_data[i]['_id'].toString();

                const cat_product = await Productmodel.find({ category_id: cat_id });

                if (cat_product.length > 0) {

                    for (var j = 0; j < cat_product.length; j++) {

                        var store_data = await store_controller.get_store(cat_product[j]["store_id"]);
                        var subcat_category = await subCategory_controller.sub_category(cat_product[j]["sub_cat_id"]);
                        Product_data.push({
                            "subcat_category": subcat_category["sub_category"],
                            "product_name": cat_product[j]['name'],
                            "images": cat_product[j]['images'],
                            "store_address": store_data['address'],
                        });
                    }

                }

                send_data.push({
                    "category": cat_data[i]['catgeory'],
                    "sub_category": cat_data[i]['sub_category'],

                    "product": Product_data

                });


            }
            res.status(200).send({ seccess: true, msg: "product details", data: send_data })



        } else {
            res.status(200).send({ success: false, message: "Product details", data: send_data });

        }
    } catch (error) {

        res.status(400).send({ success: false, message: error.message });
    }
}

module.exports = {
    add_product,
    get_product
}