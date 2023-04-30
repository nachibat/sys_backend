const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
    barcode: {
        type: String,
        unique: true,
        required: [true, 'Barcode required']
    },
    description: {
        type: String,
        required: [true, 'Description required']
    },
    category: {
        type: String,
        default: 'kiosko'
    },
    quantity: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    cost_price: Number,
    iva: Number,
    percent_profit: Number,
    price: {
        type: Number,
        required: [true, 'Price required']
    }
}, {
    timestamps: true,
    versionKey: false
});

productSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('products', productSchema);