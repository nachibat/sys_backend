const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    address: {
        type: String,
        required: [true, 'Address required']
    },
    phone: {
        type: String,
        required: [true, 'Phone required']
    },
    mail: String
}, {
    versionKey: false
});

module.exports = mongoose.model('suppliers', supplierSchema);