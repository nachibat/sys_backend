const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
    cash_withdraw: Number,
    expenses: Number,
    description: String,
    total: Number,
    id_user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('funds', fundSchema);