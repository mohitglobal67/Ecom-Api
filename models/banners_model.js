const mongoose = require("mongoose");
const banner = mongoose.Schema({
    banner: {
        type: Array,
        required: true
    }
});
module.exports = mongoose.model("Banners", banner);