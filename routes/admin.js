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

router.get("/menu/editar-despesa", (req, res) => {
    res.render("admin/editar-despesa.html")
})

router.post("/menu/sendIdDespesa", (req, res) => { //manda o ID pra pagina de editar;
    var valueId = req.body.id;
    //console.log(req.body.id)
    Despesa.findAll({

        where: {
            id: valueId
        }

    }).then(function (despesa) {
        res.send(despesa)
    }).catch((erro) => {
        res.send(erro);
    })
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

router.post("/menu/editandoDespesa", (req, res) => { // Salva a edição de uma despesa;
    console.log(req.body.id);
    console.log(req.body.valor);
    console.log(req.body.data);
    Despesa.findOne({
        where: { id: req.body.id }

    }).then(function (despesa) {

        despesa.data = req.body.data
        despesa.descricao = req.body.descricao
        despesa.valor = req.body.valor
        despesa.observacao = req.body.observacao

        despesa.save().then(() => {
            //res.redirect("/menu/listar-despesas");   n funca n sei pq, feito com javascript no front
        }).catch((err) => {
            console.log(err);
        })
    }).catch((erro) => {
        res.send(erro);
    })
    
})

router.get("/menu/excluir-despesa", (req, res) => {
    var valueId = req.query.id; // pega o ID e salva numa variavel
    //console.log(req.query.id) // Pega o ID da query e verifica no console do NODE
    Despesa.destroy({
        where: {

            id: valueId
        }
    }).then((despesas) => {
        res.render("admin/listar-despesas.html");

    }).catch((erro) => {
        res.send(erro)
    })
})


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
