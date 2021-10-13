const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: [true, 'ID user required']
    },
    total: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('sales', saleSchema);