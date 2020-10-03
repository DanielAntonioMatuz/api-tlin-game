var mongoose =  require('mongoose');
var bodyparser = require('body-parser');

var port = process.env.PORT || 3800;
var express = require('express');
var app = express();

var item_routes = require('./routes/itemRoutes');
var server_routes = require('./routes/serverRoutes');

var server = require('http').createServer(app);

mongoose.connect('mongodb+srv://vxos:qJnDOLabdSjPPTWj@vxos-server-db.x1su3.mongodb.net/vxost?retryWrites=true&w=majority', (err)=> {  //Cambiar a la BD de Tlint
    if(err){
        throw err;
    } else {
        console.log('Conectado a la DB');
        server.listen(port, function(){
            console.log('servidor conectado al puerto ' + port);
        })
    }
});

var cors = require('cors')

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(cors());

app.use('/api', item_routes);
app.use('/api', server_routes);


module.exports = app;
