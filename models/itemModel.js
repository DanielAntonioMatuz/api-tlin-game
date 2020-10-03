'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema ({
    palabra: String,
    palabraCodec: String,
    letraUno: String,
    letraDos: String
});

module.exports = mongoose.model('Item', ItemSchema);
