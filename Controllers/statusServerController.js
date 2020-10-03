'use strict'

var Server = require('../models/serverModel');


function registerStatus(req,res){
    var params = req.body;
    var item = new Server();
    console.log(params);

    if(params.status && params.version && params.origen && params.cluster){
        item.status = params.status;
        item.version = params.version;
        item.origen = params.origen;
        item.cluster = params.cluster;

        Server.find({
            $or: [
                {status: item.status.toLowerCase()},
            ]
        }).exec((err, items) => {
            if(err){
                console.log(err);
                return res.status(500).send({message: 'Error en la peticion de status', err});
            }

            if(items && items.length >= 1){
                return res.status(200).send({message: 'El Server que intenta registrar ya existe'})
            } else {
                item.save((err, itemStored) => {
                    if(err) return res.status(500).send({message: 'Error al guardar el Server'})

                    if(itemStored){
                        res.status(200).send({item: itemStored });
                    } else {
                        res.status(404).send({message: 'No se ha registrado el Server'})
                    }
                });
            }
        })



    } else {
        res.status(200).send({
            message: "Envia todos los campos necesarios"
        });
    }
}

function getStatus(req, res){
    let id = req.params['id'];

    Server.findById(id, (err, item) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if(item){
                res.status(200).send(item);
            } else {
                res.status(500).send({message:'No existe un status con ese ID'});
            }
        }
    })
}

function getAllStatus(req, res){
    Server.find((err,items)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if(items){
                res.status(200).send(items);
            } else {
                res.status(500).send({message: 'No existe ningun status'});
            }
        }
    });

}

function updateStatus(req, res){
    var id = req.params['id'];
    var data = req.body;
    console.log(data);
    Server.findByIdAndUpdate(id, {status: data.status, version: data.version , cluster: data.cluster,
        origen: data.origen
    }, (err, statusData)=>{
        if(statusData){
            res.status(200).send(statusData);
        }
    });
}



module.exports = {
    registerStatus,
    getStatus,
    getAllStatus,
    updateStatus
}
