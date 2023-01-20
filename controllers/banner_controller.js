const Banner = require('../models/banners_model');




const banner = async (req, res) => {


    try {

        var arrimage = [];
        for (var i = 0; i < req.files.length; i++) {
            arrimage[i] = req.files[i].filename;
        }

        const user_save = new Banner({
            banner: arrimage


        });
        const user_data = await user_save.save();

        res.status(200).send({
            success: true, data: user_data
        })

        // const user_data = await user.findOne({ email: req.body.email });

        // if (user_data) {


        //     res.status(200).send({
        //         success: false, msg: "email already exit"
        //     })

        // } else {

        //     const user_data = await user_save.save();

        //     res.status(200).send({
        //         success: true, data: user_data
        //     })

        // }



    } catch (error) {
        res.status(400).send(error.message);

    }
}


const bannerget = async (req, res, next) => {
    Banner.find().then(result => {
        res.status(200).json({
            BannerData: result
        });
    }).catch(err => {
        console.log(errr);
        res.status(500).json({
            error: err
        })

    })
}



module.exports = {
    banner,
    bannerget
}