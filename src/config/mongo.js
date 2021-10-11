const mongoose = require('mongoose');

let URI;

if (process.env.NODE_ENV === 'dev') {
    URI = `${process.env.DB_URI}/${process.env.DB_NAME}`;
} else {
    URI = `${process.env.DB_URI}/${process.env.DB_NAME}?authSource=admin`;
}

const dbConnect = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    }, (err, res) => {
        if (!err) {
            console.log('**** MONGODB SERVER READY ****');
        } else {
            console.log(err);
        }
    });
}

module.exports = { dbConnect }