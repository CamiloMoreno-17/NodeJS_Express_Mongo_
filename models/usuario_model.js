const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    nombre: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    estado: {
        type:Boolean,
        required:true
    },
    imagen: {
        type:String,
        required:false
    }
});

module.exports = mongoose.model('usuario', Schema);