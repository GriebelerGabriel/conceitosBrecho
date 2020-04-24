// Carregando Módulos
const express = require('express');
const app = express();
const admin = require('./routes/admin.js')
const path = require("path")
/*
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
*/

// Public

app.use(express.static(path.join(__dirname, "public")))

// Rotas
    app.use('/admin', admin);

const PORT = 8081;
    app.listen(PORT, ()=>{
        console.log("Server UP");  
    });