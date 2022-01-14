const mongoose = require('mongoose');

const validPayment  = {
    values: ['CARD', 'CASH', 'MP']
}

const saleSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    payment: {
        type: String,
        default: 'CASH',
        enum: validPayment
    },
    total: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('sales', saleSchema);