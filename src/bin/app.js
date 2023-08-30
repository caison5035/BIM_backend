const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const fileUpload = require('express-fileupload');
const config = require('./../config/config');
const ApiException = require('../utils/ApiException');
const routes = require('./../routes/index');
const app = express();

// Allow parsing jsin body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

// Allow cross-origin requests
app.use(cors());
app.options('*', cors());

app.use('' , routes );

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiException(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = app;