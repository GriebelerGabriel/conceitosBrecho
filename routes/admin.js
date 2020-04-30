const express = require('express');
const router = express.Router();
const Despesa = require('../models/Despesa');
const Produto = require('../models/Produto');
const Sequelize = require('sequelize');



router.get("/", function (req, res) {
    res.render('admin/login.html') //mapeando para HTML, __dirname leva a raiz do projeto;
});

router.post("/menu", (req, res) => {
    res.render('admin/menu.html');
});

router.get("/menu", (req, res) => {
    res.render('admin/menu.html');
});


// -------- Rotas Produtos ----------- //

router.get("/menu/cadastro-produto", (req, res) => {
    res.render('admin/cadastro-produto.html');
});

router.get("/menu/listar-produtos", (req, res) => {
    res.render('admin/listar-produtos.html');
});

router.get("/menu/importar-produtos", (req, res) => {
    res.render('admin/importar-produtos.html');
});


router.post("/menu/sendProducts", (req, res) => { // busca no banco de dados(produtos)
    Produtos.findAll().then((produtos) => { // .all() trocado atualmente por .findAll()
        res.send(produtos)
    })
});

router.post("/menu/saveProduct", (req, res) => {

    Produto.create({

        data: req.body.data,
        descricao: req.body.descricao,
        valor: req.body.valor,
        observacao: req.body.observacao,

    }).then(function () {
        res.redirect("./listar-produtos");
    }).catch(function (erro) {
        res.send("Houve um erro: " + erro);
    })
});


// -------- Rotas Despesa ----------- //
router.get("/menu/cadastro-despesa", (req, res) => {
    res.render('admin/cadastro-despesa.html');
});

router.get("/menu/listar-despesas", (req, res) => {

    res.render('admin/listar-despesas.html');

});

router.get("/menu/importar-despesas", (req, res) => {

    res.render('admin/importar-despesas.html');

});


router.post("/menu/saveDespesa", (req, res) => { // Criar no Banco de dados!

    Despesa.create({

        data: req.body.data,
        descricao: req.body.descricao,
        valor: req.body.valor,
        observacao: req.body.observacao,

    }).then(function () {
        res.redirect("./listar-despesas");
    }).catch(function (erro) {
        res.send("Houve um erro: " + erro);
    })
});

router.post("/menu/sendDespesas", (req, res) => { // Listar do Banco de dados!
    Despesa.findAll().then((despesas) => { // .all() trocado atualmente por .findAll()
        res.send(despesas)
    })
});

router.post("/menu/filtroDespesas", (req, res) => {

    Despesa.findAll({

        where: {

            data: req.body.data,
            descricao: req.body.descricao,
            valor: req.body.valor,
            observacao: req.body.observacao
        }

    }).then((despesas) => {
        console.log("estou aqui");
    })
})
    // ---------- Rotas Fornecedor -------- //
    router.get("/menu/cadastro-fornecedor", (req, res) => {
        res.render('admin/cadastro-fornecedor.html');
    });

    router.get("/menu/listar-fornecedores", (req, res) => {
        res.render('admin/listar-fornecedores.html');
    });

    router.get("/menu/importar-fornecedores", (req, res) => {
        res.render('admin/importar-fornecedores.html');
    });



    module.exports = router;
