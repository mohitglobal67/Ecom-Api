const express = require("express");

const SubcategoryModel = require("../models/sub_catagory");



const create_subCategory = async (req, res) => {

    try {
        const check_sub = await SubcategoryModel.find({ category_id: req.body.category_id });

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
                    category_id: req.body.category_id,
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
                category_id: req.body.category_id,
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




const sub_category = async (id) => {

    try {
        return SubcategoryModel.findOne({ _id: id });
    } catch (error) {

        res.status(400).send(error.message);

    }
}

module.exports = {
    create_subCategory,

    sub_category
}