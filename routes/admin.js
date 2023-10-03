const express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const multer = require('multer');
const XLSX = require("xlsx");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { where } = require('sequelize');
const alert = require('alert')

const Despesa = require('../models/Despesa');
const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');


const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


{// ################################# ROTAS DO MENU E RAIZ ####################################### //

    router.get("/", function (req, res) {
        res.render('admin/login.html') //mapeando para HTML, __dirname leva a raiz do projeto;
    });

    router.post("/menu", (req, res) => {
        res.render('admin/menu.html');
    });

    router.get("/menu", (req, res) => {
        res.render('admin/menu.html');
    });

    router.get("/sobre", (req, res) => {
        res.render('admin/sobre.html');
    });

    router.get("/menu/busca-produtos-vendidos", (req, res) => {
        
        let values = {
            valorVenda : 0,
            valorCompra : 0,
            valorLucro : 0,
            valorDespesasPagas: 0,
            valorDespesasAPagar: 0, 
        }
        
        Despesa.findAll().then((despesas) => despesas.forEach(despesa =>{
            if(despesa.observacao != "" && despesa.observacao != "Não" && despesa.observacao != null){
                values.valorDespesasPagas += despesa.valor;
            }
            else
                values.valorDespesasAPagar += despesa.valor
        }))

        Produto.findAll().then((produtos) => { 
            produtos.forEach(produto => {
                if(produto.vendido != "" && produto.vendido != null && produto.vendido != "Não" && produto.data_venda != null){
                    values.valorVenda += (produto.preco_venda);
                    values.valorLucro += (produto.preco_venda-produto.preco_custo);
            }
            values.valorCompra = (values.valorCompra + produto.preco_custo);
            });
            res.send(values);
        })
    });

    router.post("/menu/sendDadosDespesas", (req, res) => {

        Despesa.findAll({
        }).then((despesas) => { // .all() trocado atualmente por .findAll()
            res.send(despesas);
        })
    });
}

{ // ##################################### ROTA DE PRODUTOS ####################################### //


    router.get("/menu/cadastro-produto", (req, res) => {
        res.render('admin/produtos/cadastro-produto.html');
    });

    router.get("/menu/listar-produtos", (req, res) => {
        res.render('admin/produtos/listar-produtos.html');
    });

    router.get("/menu/importar-produtos", (req, res) => {
        res.render('admin/produtos/importar-produtos.html');
    });

    router.get("/menu/editar-produto", (req, res) => {
        res.render("admin/produtos/editar-produto.html")
    })


    router.post("/menu/saveProduto", upload.single('foto'), (req, res, next) => {
        var produto = {
            codigo: null,
            tipo: null,
            descricao: null,
            sexo: null,
            tamanho: null,
            grupo: null,
            preco_custo: 0,
            porcentagem: 0,
            preco_venda: 0,
            foto: null,
            data_venda: null,
            vendido: null,
            pago: null,
        }

        if(req.file)
            produto.foto = req.file.originalname;
        else
            produto.foto = "question.png"

        const properties = Object.keys(req.body);
        for (const prop of properties) {
            if(req.body[prop] == ''){
                produto[prop] = null;
            }
            else{
                produto[prop] = req.body[prop];
            }
        }
        Produto.create(produto).then(function () {
            res.redirect("/menu/listar-produtos");
        }).catch(function (erro) {
            res.send("Houve um erro: " + erro);
        })
    });


    router.get("/menu/buscar-produtos", (req, res) => { // busca no banco de dados(produtos)
        Produto.findAll({
            where:{
                
            },
            order:[
                ['id', 'DESC'],
            ],
        }).then((produtos) => { // .all() trocado atualmente por .findAll()
            res.send(produtos)
        })
    });

    router.post("/menu/editandoProduto", (req, res) => { // Salva a edição de um produto;
        Produto.findOne({
            where: { id: req.body.id }
        }).then(function (produto) {
            produto.codigo = req.body.codigo
            produto.tipo = req.body.tipo
            produto.descricao = req.body.descricao
            produto.sexo = req.body.sexo
            produto.tamanho = req.body.tamanho
            produto.grupo = req.body.grupo

            if(req.body.preco_custo == ''){
                produto.preco_custo = 0;
            }else produto.preco_custo = req.body.preco_custo;
            
            if(req.body.preco_venda == ''){
                produto.porcentagem = 0;
            }else produto.porcentagem = req.body.porcentagem;
            

            if(req.body.preco_venda == ''){
                produto.preco_venda = 0;
            }else produto.preco_venda = req.body.preco_venda;
            
            produto.foto = req.body.foto
            produto.vendido = req.body.vendido
            produto.pago = req.body.pago 

            if(req.body.data_venda == 'Invalid date' || req.body.data_venda == ''){
                produto.data_venda = null
                
            }else
                produto.data_venda = req.body.data_venda

            produto.save().then(() => {
                res.status(200).json({ "status": true, "result": 'Edit successful!' })
            }).catch((err) => {
                res.status(200).json({ "status": false, "result": "Request Failed! Reason: "+err })
            })
        }).catch((erro) => {
            res.status(200).json({ "status": false, "result": "Can't find the product! ID: " + req.body.id })
        })

    })

    router.get("/menu/excluir-produto", (req, res) => {
        var valueId = req.query.id; // pega o ID e salva numa variavel

        Produto.destroy({
            where: {
                id: valueId
            }
        }).then((produtos) => {
            res.redirect("/menu/listar-produtos");
        }).catch((erro) => {
            res.send(erro)
        })
    })

    router.get("/menu/getProdutoById", (req, res) => { //manda o ID pra pagina de editar;
        Produto.findAll({
            where: {
                id: req.query.id
            },
        }).then(function (produto) {
            res.send(produto)
        }).catch((erro) => {
            res.send(erro);
        })
    });

    router.post("/menu/filtroProdutos", (req, res) => {
        var whereQuery = {} // cria o objeto que vai receber os dados da DESPESA

        if (req.body.codigo) { // verifica se existe algum dado nao nulo ou vazio;
            whereQuery.codigo = { [Op.like]: '%' + req.body.codigo + '%' } // set o dado dentro do objeto que foi criado
        }
        if (req.body.tipo) {
            whereQuery.tipo = { [Op.like]: '%' + req.body.tipo + '%' }
        }
        if (req.body.descricao) {
            whereQuery.descricao = { [Op.like]: '%' + req.body.descricao + '%' }
        }
        if (req.body.sexo) {
            whereQuery.sexo = { [Op.like]: '%' + req.body.sexo + '%' }
        }
        if (req.body.tamanho) {
            whereQuery.tamanho = { [Op.like]: '%' + req.body.tamanho + '%' }
        }
        if (req.body.grupo) {
            whereQuery.grupo = { [Op.like]: '%' + req.body.grupo + '%' }
        }
        if (req.body.preco_custo) {
            whereQuery.preco_custo = req.body.preco_custo
        }
        if (req.body.porcentagem) {
            whereQuery.porcentagem = req.body.porcentagem
        }
        if (req.body.preco_venda) {
            whereQuery.preco_venda = req.body.preco_venda
        }
        if (req.body.data_venda) {
            whereQuery.data_venda = req.body.data_venda
        }
        if (req.body.vendido) {
            whereQuery.vendido = { [Op.like]: '%' + req.body.vendido + '%' }
        }
        if (req.body.pago) {
            whereQuery.pago = req.body.pago
        }
        if (req.body.foto) {
            whereQuery.foto = { [Op.like]: '%' + req.body.foto + '%' }
        }
        Produto.findAll({

            where: whereQuery

        }).then((produtos) => {
            res.send(produtos)
        })
    })

    router.post("/menu/uploadProdutosXLSX", upload.single("excelFile"), (req, res, next) => {
            if (!req.file) {
                return res.status(400).send("Selecione o arquivo.");
            }
            else{
                const buffer = req.file.buffer;
                const workbook = XLSX.read(buffer, { cellDates: true, cellNF: false });

                // Assuming you want to work with the first sheet
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert the sheet data to JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
                try{
                    let countItems = 0;
                    jsonData.map( (item) =>{

                        let precoCustoFormatted = item.PRECO_CUSTO.replace(/,/g, '.');
                        let precoVendaFormatted = item.PRECO_VENDA.replace(/,/g, '.');
                    
                        Produto.create({

                            codigo: item.CODIGO,
                            tipo: item.TIPO,
                            descricao: item.DESCRICAO,
                            sexo: item.SEXO,
                            tamanho: item.TAM,
                            grupo: item.GRUPO,
                            preco_custo: precoCustoFormatted,
                            porcentagem: item.PORCENTAGEM,
                            preco_venda: precoVendaFormatted,
                            foto: "photos/question.png",
                            data_venda: item.DATA_VENDA,
                            vendido: item.VENDIDO,
                            pago: item.PAGO

                        })
                        countItems++
                        console.log(countItems)
                        })
                    
                }catch(e){
                    console.log("ERRO! "+ e)
                }
            }
        res.redirect("/menu/listar-produtos");
    })

}

{// ###################################### ROTA DE DESPESAS ####################################### //


    router.get("/menu/cadastro-despesa", (req, res) => {
        res.render('admin/despesas/cadastro-despesa.html');
    });

    router.get("/menu/listar-despesas", (req, res) => {

        res.render('admin/despesas/listar-despesas.html');

    });

    router.get("/menu/importar-despesas", (req, res) => {

        res.render('admin/despesas/importar-despesas.html');

    });

    router.get("/menu/editar-despesa", (req, res) => {
        res.render("admin/despesas/editar-despesa.html")
    })

    router.post("/menu/saveDespesa", (req, res) => {
        var despesa = {
            data: null,
            descricao: null,
            valor: null,
            observacao: null,
        }

        const properties = Object.keys(req.body);
        for (const prop of properties) {
            if(req.body[prop] == ''){
                despesa[prop] = null;
            }
            else{
                despesa[prop] = req.body[prop];
            }
        }
        Despesa.create(despesa).then(function () {
            res.redirect("/menu/listar-despesas");
        }).catch(function (err) {
            res.send("Houve um erro: " + err);
        })
    });

    router.get("/menu/sendDespesas", (req, res) => { 
        Despesa.findAll().then((despesas) => {
            res.send(despesas)
        })
    });

    router.post("/menu/editandoDespesa", (req, res) => {
        Despesa.findOne({
            where: { id: req.body.id }
        }).then(function (despesa) {

            if(req.body.data == 'Invalid date' || req.body.data == ''){
                despesa.data = null
            }else
                despesa.data = req.body.data

            despesa.descricao = req.body.descricao
            despesa.valor = req.body.valor
            despesa.observacao = req.body.observacao

            despesa.save().then(() => {
                res.status(200).json({ "status": true, "result": 'Despesa alterada com successo!' })
            }).catch((err) => {
                res.status(200).json({ "status": false, "result": "Request Failed! Reason: "+err })
            })
        }).catch((erro) => {
            res.status(200).json({ "status": false, "result": "Can't find the product! ID: " + req.body.id })
        })

    })

    router.get("/menu/excluir-despesa", (req, res) => {
        var valueId = req.query.id; // pega o ID e salva numa variavel
        Despesa.destroy({
            where: {
                id: valueId
            }
        }).then((despesas) => {
            res.redirect("/menu/listar-despesas");

        }).catch((erro) => {
            res.send(erro)
        })
    })

    router.post("/menu/sendIdDespesa", (req, res) => { //manda o ID pra pagina de editar;
        var valueId = req.body.id;
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


    router.post("/menu/filtroDespesas", (req, res) => {
        var whereQuery = {}

        if (req.body.data) { // verifica se existe algum dado nao nulo ou vazio;
            whereQuery.data = req.body.data// set o dado dentro do objeto que foi criado
        }
        if (req.body.valor) { // verifica se existe algum dado nao nulo ou vazio;
            whereQuery.valor = req.body.valor// set o dado dentro do objeto que foi criado
        }
        if (req.body.observacao) { // verifica se existe algum dado nao nulo ou vazio;
            whereQuery.observacao = { [Op.like]: '%' + req.body.observacao + '%' }// set o dado dentro do objeto que foi criado
        }
        if (req.body.descricao) { // verifica se existe algum dado nao nulo ou vazio;
            whereQuery.descricao = { [Op.like]: '%' + req.body.descricao + '%' }// set o dado dentro do objeto que foi criado
        }

        Despesa.findAll({

            where: whereQuery

        }).then((despesas) => {
            res.send(despesas)
        })
    })


    router.post("/menu/uploadDespesasXLSX", upload.single("planilha"), (req, res, next) => {
        
        res.render("admin/despesas/listar-despesas.html");
    })

    router.post("/menu/downloadDespesasXLSX", (req, res) => {

        Despesa.findAll().then((despesas) => {

        })
    })


}

{ // ################################# ROTA DE FORNECEDORES ####################################### //

    router.get("/menu/cadastro-fornecedor", (req, res) => {
        res.render('admin/fornecedores/cadastro-fornecedor.html');
    });

    router.get("/menu/listar-fornecedores", (req, res) => {
        res.render('admin/fornecedores/listar-fornecedores.html');
    });

    router.get("/menu/editar-fornecedor", (req, res) => {
        res.render('admin/fornecedores/editar-fornecedor.html');
    });

    router.get("/menu/importar-fornecedores", (req, res) => {
        res.render('admin/fornecedores/importar-fornecedores.html');
    });

    router.post("/menu/saveFornecedor", (req, res) => {
        var fornecedor = {
            nome: null,
            endereco: null,
            bairro: null,
            cep: null,
            municipio: null,
            estado: null,
            telefone: null,
            celular: null,
            email: null,
            cnpj_cpf: null,
            grupo: null,
            situacao: null,
            data_nascimento: null,
            observacao: null,
        }

        const properties = Object.keys(req.body);
        for (const prop of properties) {
            if(req.body[prop] == ''){
                fornecedor[prop] = null;
            }
            else{
                fornecedor[prop] = req.body[prop];
            }
        }

        Fornecedor.create(fornecedor).then(function () {
            res.redirect("/menu/listar-Fornecedores");
        }).catch(function (erro) {
            res.send("Houve um erro: " + erro);
        })
    });

    router.get("/menu/sendFornecedores", (req, res) => { // busca no banco de dados(fornecedores)
        Fornecedor.findAll().then((fornecedores) => { // .all() trocado atualmente por .findAll()
            res.send(fornecedores)
        })
    });

    router.get("/menu/getFornecedorById", (req, res) => { //manda o ID pra pagina de editar;

        Fornecedor.findAll({
            where: {
                id: req.query.id
            },
        }).then(function (fornecedor) {
            res.send(fornecedor)
        }).catch((erro) => {
            res.send(erro);
        })
    });
    router.post("/menu/editandoFornecedor", (req, res) => { // Salva a edição de um produto;
        console.log(req.body)
        Fornecedor.findOne({
            where: { id: req.body.id }
        }).then(function (fornecedor) {
            fornecedor.nome = req.body.nome
            fornecedor.endereco = req.body.endereco
            fornecedor.bairro = req.body.bairro
            fornecedor.cep = req.body.cep
            fornecedor.municipio = req.body.municipio
            fornecedor.telefone = req.body.telefone
            fornecedor.celular = req.body.celular
            fornecedor.email = req.body.email
            fornecedor.cnpj_cpf = req.body.cnpj_cpf
            fornecedor.grupo = req.body.grupo
            fornecedor.situacao = req.body.situacao

            if(req.body.data_nascimento == 'Invalid date' || req.body.data_nascimento == ''){
                fornecedor.data_nascimento = null
            }else
                fornecedor.data_nascimento = req.body.data_nascimento

            fornecedor.observacao = req.body.observacao,

            fornecedor.save().then(() => {
                res.status(200).json({ "status": true, "result": 'Fornecedor editado com successo!' })
            }).catch((err) => {
                res.status(200).json({ "status": false, "result": "Request Failed! Reason: "+err })
            })
        }).catch((erro) => {
            res.status(200).json({ "status": false, "result": "Can't find the product! ID: " + req.body.id })
        })

    })

    router.post("/menu/uploadFornecedoresXLSX", upload.single("planilha"), (req, res, next) => {
        res.redirect("/menu/listar-fornecedores");
    })

    router.post("/menu/filtroFornecedores", (req, res) => {

        var whereQuery = {} // cria o objeto que vai receber os dados da DESPESA

        if (req.body.nome) { // verifica se existe algum dado nao nulo ou vazio;
            whereQuery.nome = { [Op.like]: '%' + req.body.nome + '%' } // set o dado dentro do objeto que foi criado
        }
        if (req.body.endereco) {
            whereQuery.endereco = { [Op.like]: '%' + req.body.endereco + '%' }
        }
        if (req.body.bairro) {
            whereQuery.bairro = { [Op.like]: '%' + req.body.bairro + '%' }
        }
        if (req.body.cep) {
            whereQuery.cep = { [Op.like]: '%' + req.body.cep + '%' }
        }
        if (req.body.municipio) {
            whereQuery.municipio = { [Op.like]: '%' + req.body.municipio + '%' }
        }
        if (req.body.estado) {
            whereQuery.estado = { [Op.like]: '%' + req.body.estado + '%' }
        }
        if (req.body.telefone) {
            whereQuery.telefone = { [Op.like]: '%' + req.body.telefone + '%' }
        }
        if (req.body.celular) {
            whereQuery.celular = { [Op.like]: '%' + req.body.celular + '%' }
        }
        if (req.body.cnpj_cpf) {
            whereQuery.cnpj_cpf = { [Op.like]: '%' + req.body.cnpj_cpf + '%' }
        }
        if (req.body.grupo) {
            whereQuery.grupo = { [Op.like]: '%' + req.body.grupo + '%' }
        }
        if (req.body.situacao) {
            whereQuery.situacao = { [Op.like]: '%' + req.body.situacao + '%' }
        }
        if (req.body.data_nascimento) {
            whereQuery.data_nascimento = req.body.data_nascimento
        }
        if (req.body.observacao) {
            whereQuery.observacao = { [Op.like]: '%' + req.body.observacao + '%' }
        }

        Fornecedor.findAll({

            where: whereQuery

        }).then((fornecedores) => {
            res.send(fornecedores)
        })
    })
}
module.exports = router;