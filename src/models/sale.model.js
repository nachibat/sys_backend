const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    total: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('sales', saleSchema);