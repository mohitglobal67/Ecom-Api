const Category = require("../models/catagory_model");







const addCategory = async (req, res) => {
    try {

        const category_data = await Category.find();



        if (category_data.length > 0) {


            let checking = false;

            for (let i = 0; i < category_data.length; i++) {


                if (category_data[i]['catgeory'] === req.body.category.toLowerCase()) {


                    checking = true;
                    break;
                }

            }

            if (checking == false) {
                const category = new Category({
                    catgeory: req.body.category

                });
                const cat_data = await category.save();
                res.status(200).send({ success: true, msg: "data", data: cat_data });
            } else {

                res.status(200).send({ success: true, msg: "This Category (" + req.body.category + ") is already exit" });
            }

        } else {
            const category = new Category({
                catgeory: req.body.category

            });
            const cat_data = await category.save();
            res.status(200).send({ success: true, msg: "data", data: cat_data });
        }



    }
    catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const get_category = async () => {
    try {
        return Category.find();

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });

    }
}

module.exports = {
    addCategory,
    get_category
}