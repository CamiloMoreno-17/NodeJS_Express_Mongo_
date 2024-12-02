const usuarios = require('./controllers/usuarios');
const cursos = require('./controllers/cursos');

const express = require('express');
const mongoose = require('mongoose');

//conexion a la BD mongodb
mongoose.connect('mongodb://localhost:27017/usercoursesdb')
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    
    .catch((err) => {
        console.error('Error al conectar a MongoDB', err);
    });


//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//end points (recursos)
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api REST Ok, y ejecutándose...')
})