const express = require('express');
const router = express.Router();
const Despesa = require('../models/Despesa');



router.get("/", function(req,res){
    res.render('admin/login.html') //mapeando para HTML, __dirname leva a raiz do projeto;
});

router.post("/menu", (req,res) =>{
    res.render('admin/menu.html');
});

router.get("/menu", (req,res) =>{
    res.render('admin/menu.html');
});


// -------- Rotas Produtos ----------- //
router.get("/menu/cadastro-produto", (req,res) =>{
    res.render('admin/cadastro-produto.html');
});

router.get("/menu/listar-produtos", (req,res) =>{
    res.render('admin/listar-produtos.html');
});

router.get("/menu/importar-produtos", (req,res) =>{
    res.render('admin/importar-produtos.html');
});

// -------- Rotas Despesa ----------- //
router.get("/menu/cadastro-despesa", (req,res) =>{
    res.render('admin/cadastro-despesa.html');
});

router.post("/menu/sendDespesa", (req,res) =>{

    Despesa.create({

        data: req.body.data,
        descricao: req.body.descricao,
        valor: req.body.valor,
        observacao: req.body.observacao,

    }).then(function(){
        res.render('admin/listar-despesas.html');
    }).catch(function(erro){
        res.send("Houve um erro: "+ erro);
    })

    
});

router.get("/menu/listar-despesas", (req,res) =>{
    res.render('admin/listar-despesas.html');
});

router.get("/menu/importar-despesas", (req,res) =>{

    res.render('admin/importar-despesas.html');

});

// ---------- Rotas Fornecedor -------- //
router.get("/menu/cadastro-fornecedor", (req,res) =>{
    res.render('admin/cadastro-fornecedor.html');
});

router.get("/menu/listar-fornecedores", (req,res) =>{
    res.render('admin/listar-fornecedores.html');
});

router.get("/menu/importar-fornecedores", (req,res) =>{
    res.render('admin/importar-fornecedores.html');
});



module.exports = router;
