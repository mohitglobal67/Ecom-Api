const Store = require('../models/store_model');
const User = require('../models/user_model');



const create_store = async (req, res) => {
    try {

        const userData = await User.findOne({ _id: req.body.vendor_id });
        if (userData) {
            if (!req.body.latitude || !req.body.longitude) {
                res.status(200).send({ success: false, msg: 'lat and long not found' });

            } else {

                const vendorData = await Store.findOne({ vendor_id: req.body.vendor_id })

                if (vendorData) {
                    res.status(200).send({ success: false, msg: 'This vendor already created' });

                } else {
                    // var arrimage = [];
                    // for (var i = 0; i < req.files.length; i++) {
                    //     arrimage[i] = req.files[i].filename;
                    // }



                    const store = new Store({
                        vendor_id: req.body.vendor_id,
                        logo: req.file.filename,
                        business_email: req.body.business_email,
                        address: req.body.address,
                        pin: req.body.pin,
                        location: {
                            type: "Point",
                            coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
                        }
                    });
                    const storeData = await store.save();
                    res.status(200).send({ success: true, msg: 'Store Data', data: storeData });

                }



            }


        }
        else {
            res.status(200).send({ success: false, msg: 'Vendor ID does not exists.' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }


}


const get_store = async (id) => {

    try {
        return Store.findOne({ _id: id });
    } catch (error) {

        res.status(400).send(error.message);

    }
}

module.exports = {
    create_store,
    get_store
}