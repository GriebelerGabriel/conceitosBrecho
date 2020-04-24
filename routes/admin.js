const express = require('express');
const router = express.Router();


router.get("/", function(req,res){
    res.render('../views/admin/login', {title: 'res vs app render'}) //mapeando para HTML, __dirname leva a raiz do projeto;
});

router.get("/menu", (req,res) =>{
    res.send("Menu"); // deve ser digitado na url pra funcionar
});

router.get("/produto", (req,res) =>{
    res.send("Cadastro Produtos"); // deve ser digitado na url pra funcionar
});

/*
app.get("/", function(req,res){
    res.sendFile(__dirname + "../pages/login.html"); //mapeando para HTML, __dirname leva a raiz do projeto;
});

app.post("/menu", (req,res) =>{
    res.sendFile(__dirname + "/pages/menu.html"); // deve ser digitado na url pra funcionar
});

app.post("/produtos.html", (req,res)=>{
    res.sendFile(__dirname + "/pages/produtos.html"); // deve ser digitado na url pra funcionar
});

app.post('/produto', function(req,res){

    if(req.body.username == 'admin' && req.body.password == '12345'){
        res.sendfile(__dirname + "/pages/menu.html") // é enviado pelo botão na pagina login;
    }
    else{
        res.sendfile(__dirname + "/pages/login.html")
    }
    

});*/

module.exports = router;