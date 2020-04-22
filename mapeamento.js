
const express = require("express");
const app = express();


app.get("/", function(req,res){
    res.sendFile(__dirname + "/pages/login.html"); //mapeando para HTML, __dirname leva a raiz do projeto;
});

app.get("/menu", function(req,res){
    res.sendFile(__dirname + "/pages/menu.html"); // deve ser digitado na url pra funcionar
});

app.get("/produtos", function(req,res){
    res.sendFile(__dirname + "/produtos.html"); 
});





app.listen('8081');