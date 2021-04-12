const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connectiondb');


//module.exports = server;

exports.router = (function () {
    var router = express.Router();

    router.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    })
    })();
    