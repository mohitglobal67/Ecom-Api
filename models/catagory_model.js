const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    catgeory: {
        type: String,
        required: true
    },
   

});
module.exports = mongoose.model("Category", categorySchema);