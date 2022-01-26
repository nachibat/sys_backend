const mongoose = require('mongoose');

const cashSchema = new mongoose.Schema({
    cash: {
        type: Number,
        required: [true, 'Cash required']
    },
    ivc: {
        type: Number,
        required: [true, 'IVC required']
    },
    uvc: {
        type: Number,
        required: [true, 'UVC required']
    },
    avc: {
        type: Number,
        required: [true, 'AVC required']
    },
    kiosk: {
        type: Number,
        required: [true, 'Kiosk required']
    },
    tksi: {
        type: Number,
        required: [true, 'TKSI required']
    },
    expenses: {
        type: Number,
        required: [true, 'Expenses required']
    },
    cigarettes: {
        type: Number,
        required: [true, 'Cigarettes required']
    },
    withdrawals: {
        type: Number,
        required: [true, 'Withdrawals required']
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('cash', cashSchema);