const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    type: {
        type: String, 
    },
    status: {
        type: Boolean,
    },
    description: {
        type: String, 
    },
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    imgUrl: {
        type: String, 
    }
}, {
    timestamps: true
});
module.exports =  mongoose.model('Products', productsSchema);