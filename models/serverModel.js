'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServerStatus = Schema ({
    status: String,
    version: String,
    origen: String,
    cluster: String
});

module.exports = mongoose.model('ServerStatus', ServerStatus);
