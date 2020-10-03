var express = require('express');
var Item = require('../Controllers/itemController');
var api = express.Router();

api.post('/register-item', Item.registerItem);
api.get('/get-items', Item.getItems);
api.get('/get-item/:id', Item.getItem);

/*
api.get('/item/:id', Item.deleteFollow);
*/


module.exports = api;
