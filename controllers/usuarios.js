const express = require('express');
const Curso = require('../models/usuario_model');
const Joi = require('@hapi/joi');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de Usuarios Funcionando correctamente...')
});

//validaciones para el objeto usuario
const Schema = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[A-Za-záéíóú ]{3,30}$/),

    password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),

    email:Joi.string()
    .email({minDomainSegments: 2, tlds: {allow:['com', 'net', 'edu', 'co']}})
});



//Endpoint de tipo POST para el recurso USUARIOS
ruta.post('/', (req, res) => {
    let body = req.body;

    const {error, value} = Schema.validate({nombre: body.nombre, email: body.email});
    if(!error){
        let resultado = crearUsuario(body);

        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});

//Endpoint de tipo PUT para el recurso USUARIOS
ruta.put('/:email', (req, res) => {
    const {error, value} = Schema.validate({nombre: req.body.nombre});
    if(!error){
        let resultado = actaulizarUsuario(req.params.email, req.body);
        resultado.then( valor => {
            res.json({
                valor
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});

//Endpoint de tipo DELETE para el recurso USUARIOS
ruta.delete('/email', (req, res) => {
    let resultado = desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

//funcion asincrona para crear un objeto de tipo usuario
async function crearUsuario(body){
    let usuario = new Usuario({
        email       : body.email,
        nombre      : body.nombre,
        password    : body.password
    });
    return await usuario.save();
}


async function actaulizarUsuario(email, body) {
    let usuario = await Usuario.findOneAndUpdate ({
        $set:{
            nombre: body.nombre,
            password: body.password
        }
    }, {new: true});
    return usuario;
}


//Funcion asincrona para inactivar un usuario
async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate({"email": email},{
        $set: {
            estado: false
        }
    }, {new: true});
    return usuario;
}

module.exports = ruta;