'use strict'

var Item = require('../models/itemModel');


function registerItem(req,res){
    var params = req.body;
    var item = new Item();
    console.log(params);

    if(params.palabra && params.letraUno && params.letraDos && params.palabraCodec){
        item.palabra = params.palabra;
        item.letraUno = params.letraUno;
        item.letraDos = params.letraDos;
        item.palabraCodec = params.palabraCodec;

        Item.find({
            $or: [
                {palabra: item.palabra.toLowerCase()},
                {palabraCodec: item.palabraCodec.toLowerCase()}
            ]
        }).exec((err, items) => {
            if(err){
                console.log(err);
                return res.status(500).send({message: 'Error en la peticion de Items', err});
            }

            if(items && items.length >= 1){
                return res.status(200).send({message: 'El Item que intenta registrar ya existe'})
            } else {
                item.save((err, itemStored) => {
                    if(err) return res.status(500).send({message: 'Error al guardar el Item'})

                    if(itemStored){
                        res.status(200).send({item: itemStored });
                    } else {
                        res.status(404).send({message: 'No se ha registrado el Item'})
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

function getItem(req, res){
    let id = req.params['id'];

    Item.findById(id, (err, item) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if(item){
                res.status(200).send(item);
            } else {
                res.status(500).send({message:'No existe un item con ese ID'});
            }
        }
    })
}

function getItems(req, res){
    Item.find((err,items)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if(items){
                res.status(200).send(items);
            } else {
                res.status(500).send({message: 'No existe ningun item'});
            }
        }
    });

}

module.exports = {
    registerItem,
    getItem,
    getItems
}
