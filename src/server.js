require('./config/general');

const fs = require('fs');
const https = require('https');

const express = require('express');
const cors = require('cors');

const { dbConnect } = require('./config/mongo');

const ssl_options = {
    key: fs.readFileSync(process.env.KEY),
    cert: fs.readFileSync(process.env.CERT)
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTION');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTION');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept');
    next();
});

app.use('/api', require('./routes/routes'));

dbConnect();

if (process.env.NODE_ENV === 'dev') {
    app.listen(process.env.PORT, () => {
        console.log('API READY. Listening on port', process.env.PORT);
    });
} else {
    https.createServer(ssl_options, app).listen(process.env.SECURE_PORT, () => {
        console.log('API READY. Listening on port', process.env.SECURE_PORT);
    });
}