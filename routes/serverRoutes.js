var express = require('express');
var Server = require('../Controllers/statusServerController');
var api = express.Router();

api.post('/register-status', Server.registerStatus);
api.get('/get-status', Server.getStatus);
api.get('/get-all-status', Server.getAllStatus);
api.put('/update-status/:id', Server.updateStatus);

/*
api.get('/item/:id', Server.deleteFollow);
*/


module.exports = api;
