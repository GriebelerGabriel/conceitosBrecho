
const express = require("express");
const app = express();


app.get("/", function(req,res){
    res.sendFile(__dirname + "/pages/login.html"); //mapeando para HTML, __dirname leva a raiz do projeto;
});

app.post("/menu", function(req,res){
    res.sendFile(__dirname + "/pages/menu.html"); // deve ser digitado na url pra funcionar
});

app.get("/produtos", function(req,res){
    res.sendFile(__dirname + "/pages/produtos.html"); // deve ser digitado na url pra funcionar
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/login', function(req,res){

    if(req.body.username == 'admin' && req.body.password == '12345'){
        res.sendfile(__dirname + "/pages/menu.html") // é enviado pelo botão na pagina login;
    }
    else{
        res.sendfile(__dirname + "/pages/login.html")
    }
    

});

app.listen('8081');