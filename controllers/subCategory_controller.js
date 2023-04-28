const express = require("express");

const SubcategoryModel = require("../models/sub_catagory");
const category_controller = require("../controllers/category_controller")


const create_subCategory = async (req, res) => {

    try {
        const check_sub = await SubcategoryModel.find({ sub_category: req.body.sub_category });

        if (check_sub.length > 0) {
            let checking = false;
            for (let i = 0; i < check_sub.length; i++) {
                if (check_sub[i]['sub_category'].toLowerCase() === req.body.sub_category.toLowerCase()) {

                    checking = true;
                    break;

                }
            }
            if (checking === false) {
                const subCategory = new SubcategoryModel({
                    category_id: req.params.id,
                    sub_category: req.body.sub_category
                });

                const sub_cat_data = await subCategory.save();

                res.status(200).send({
                    success: true,
                    msg: "Subcategory data", data: sub_cat_data
                })


            } else {
                res.status(200).send({
                    success: true,
                    msg: "Your sub Category " + req.body.sub_category + "" + " Already exits"
                })

            }


        } else {
            const subCategory = new SubcategoryModel({
                category_id: req.params.id,
                sub_category: req.body.sub_category
            });

            const sub_cat_data = await subCategory.save();
            res.status(200).send({
                success: true,
                msg: "Subcategory data", data: sub_cat_data
            })

        }


    } catch (error) {
        res.status(400).send({
            success: false,
            msg: error.message,
        })

    }



}

const categorybyid = async (req, res) => {


    try {

        var send_data = [];
        var cat_data = await category_controller.get_category();

        //var subcat_data = await subCategory_controller.sub_category();

        if (cat_data.length > 0) {

            for (var i = 0; i < cat_data.length; i++) {
                var Product_data = [];

                var cat_id = cat_data[i]['_id'].toString();
                // var subcat_id = subcat_data[i]['_id'].toString();

                const cat_product = await SubcategoryModel.find({
                    category_id: cat_id
                });

                if (cat_product.length > 0) {

                    for (var j = 0; j < cat_product.length; j++) {

                        // var store_data = await store_controller.get_store(cat_product[j]["store_id"]);
                        // var subcat_category = await subCategory_controller.sub_category(cat_product[j]["sub_cat_id"]);
                        Product_data.push({
                            "subcat_category": cat_product[j]["sub_category"],


                        });

                    }

                }

                send_data.push({

                    "sub_category": cat_data[i]['sub_category'],
                    "Category_name": cat_data[i]["catgeory"],

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

// const categorybyid = (req, res) => {
//     Category.find({ _id: req.params.id }).then(result => {
//         res.status(200).json({
//             message: "Product Deleted",
//             StudentData: result
//         });
//     }).catch(err => {
//         console.log(errr);
//         res.status(500).json({
//             error: err
//         })

//     })
// }

const sub_category = async (id) => {

    try {
        return SubcategoryModel.findOne({ _id: id });
    } catch (error) {

        res.status(400).send(error.message);

    }
}

module.exports = {
    create_subCategory,
    categorybyid,

    sub_category
}