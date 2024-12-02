const express = require('express');
const Curso = require('../models/usuario_model');
const Jol = require('@hapi/joi');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de Usuarios Funcionando correctamente...')
});

module.exports = ruta;