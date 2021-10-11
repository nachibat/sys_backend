require('./config/general');

const express = require('express');
const cors = require('cors');

const { dbConnect } = require('./config/mongo');

const PORT = process.env.PORT;

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

app.listen(PORT, () => {
    console.log('API READY. Listening on port', PORT);
});