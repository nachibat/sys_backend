const mongoose = require('mongoose');

const itemSaleSchema = new mongoose.Schema({
    id_sale: {
        type: String,
        required: [true, 'ID sale required']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    price: {
        type: Number,
        required: [true, 'Price required']
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('item_sales', itemSaleSchema);