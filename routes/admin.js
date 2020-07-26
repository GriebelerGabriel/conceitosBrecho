const express = require('express');
const router = express.Router();
const Despesa = require('../models/Despesa');
const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');
const Sequelize = require('sequelize');
const multer = require('multer');
const xlsxj = require("xlsx-to-json");
const Op = Sequelize.Op;
const exportFromJSON = require('export-from-json');


const http = require("http");
const path = require("path");
const fs = require("fs");


const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, __dirname + "/public");
    },
    filename: function (req, file, cb) {

        // error first callback
        cb(null, `${file.originalname}`); // salva o nome do arquivo no upldoad
    }
});
const upload = multer({ storage });


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

    router.post("/menu/sendDadosVendidos", (req, res) => {

        Produto.findAll({
        }).then((produtos) => { // .all() trocado atualmente por .findAll()
            res.send(produtos);
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
        res.render('admin/cadastro-produto.html');
    });

    router.get("/menu/listar-produtos", (req, res) => {
        res.render('admin/listar-produtos.html');
    });

    router.get("/menu/importar-produtos", (req, res) => {
        res.render('admin/importar-produtos.html');
    });

    router.get("/menu/editar-produto", (req, res) => {
        res.render("admin/editar-produto.html")
    })


    router.post("/menu/saveProduto", upload.single('foto'), (req, res, next) => {
        if (req.body.foto) {
            Produto.create({

                codigo: req.body.codigo,
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                sexo: req.body.sexo,
                tamanho: req.body.tamanho,
                grupo: req.body.grupo,
                preco_custo: req.body.precoCusto,
                porcentagem: req.body.porcento,
                preco_venda: req.body.precoVenda,
                foto: req.file.originalname,
                data_venda: req.body.dataVenda,
                vendido: req.body.vendido,
                pago: req.body.pago

            }).then(function () {
                res.redirect("./listar-produtos");
            }).catch(function (erro) {
                res.send("Houve um erro: " + erro);
            })
        }
        else {
            Produto.create({

                codigo: req.body.codigo,
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                sexo: req.body.sexo,
                tamanho: req.body.tamanho,
                grupo: req.body.grupo,
                preco_custo: req.body.precoCusto,
                porcentagem: req.body.porcento,
                preco_venda: req.body.precoVenda,
                foto: "question.png",
                data_venda: req.body.dataVenda,
                vendido: req.body.vendido,
                pago: req.body.pago

            }).then(function () {
                res.redirect("./listar-produtos");
            }).catch(function (erro) {
                res.send("Houve um erro: " + erro);
            })
        }
    });


    router.post("/menu/sendProdutos", (req, res) => { // busca no banco de dados(produtos)
        Produto.findAll().then((produtos) => { // .all() trocado atualmente por .findAll()
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
            produto.preco_custo = req.body.preco_custo
            produto.porcentagem = req.body.porcentagem
            produto.preco_venda = req.body.preco_venda
            produto.data_venda = req.body.data_venda
            produto.vendido = req.body.vendido
            produto.pago = req.body.pago


            produto.save().then(() => {
                res.redirect("/menu/listar-despesas");
            }).catch((err) => {
                console.log(err);
            })
        }).catch((erro) => {
            res.send(erro);
        })

    })

    router.post("/menu/saveEditFoto", upload.single('foto'), (req, res, next) => {

        Produto.findOne({
            where: { id: req.body.id }
        }).then(function (produto) {

            produto.foto = req.file.originalname;

            produto.save().then(() => {
                res.redirect('back');
            })
        })

    })


    router.get("/menu/excluir-produto", (req, res) => {
        var valueId = req.query.id; // pega o ID e salva numa variavel
        console.log(req.query.id) // Pega o ID da query e verifica no console do NODE
        Produto.destroy({
            where: {

                id: valueId
            }
        }).then((produtos) => {
            res.render("admin/listar-produtos.html");

        }).catch((erro) => {
            res.send(erro)
        })
    })

    router.post("/menu/sendIdProduto", (req, res) => { //manda o ID pra pagina de editar;
        var valueId = req.body.id;
        //console.log(req.body.id)
        Produto.findAll({

            where: {
                id: valueId
            }

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

    router.post("/menu/uploadProdutosXLSX", upload.single("planilha"), (req, res, next) => {
        xlsxj({
            input: __dirname + "/public/" + req.file.originalname,
            output: "output.json"
        }, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                var count = Object.keys(result).length;

                for (x = 0; x < count; x++) {

                    if ((result[x].FOTO == 'OK' || result[x].FOTO == '') && result[x].DATA_VENDA == '') {

                        Produto.create({

                            codigo: result[x].CODIGO,
                            tipo: result[x].TIPO,
                            descricao: result[x].DESCRICAO,
                            sexo: result[x].SEXO,
                            tamanho: result[x].TAM,
                            grupo: result[x].GRUPO,
                            preco_custo: result[x].PRECO_CUSTO,
                            porcentagem: result[x].PORCENTAGEM,
                            preco_venda: result[x].PRECO_VENDA,
                            data_venda: '01-01-1000', // 01/01/1000 --> setado como default; 
                            vendido: result[x].VENDIDO,
                            pago: result[x].PAGO,
                            foto: 'question.png'  // setado como foto default


                        }).then(function () {
                            console.log("Cadastrado com sucesso!");
                        }).catch(function (erro) {
                            console.log("Houve um erro: " + erro);
                        });
                    }
                    else if ((result[x].FOTO == 'OK' || result[x].FOTO == '') && result[x].DATA_VENDA != '') {
                        Produto.create({

                            codigo: result[x].CODIGO,
                            tipo: result[x].TIPO,
                            descricao: result[x].DESCRICAO,
                            sexo: result[x].SEXO,
                            tamanho: result[x].TAM,
                            grupo: result[x].GRUPO,
                            preco_custo: result[x].PRECO_CUSTO,
                            porcentagem: result[x].PORCENTAGEM,
                            preco_venda: result[x].PRECO_VENDA,
                            data_venda: result[x].DATA_VENDA,
                            vendido: result[x].VENDIDO,
                            pago: result[x].PAGO,
                            foto: 'question.png'  // setado como foto default


                        }).then(function () {
                            console.log("Cadastrado com sucesso!");
                        }).catch(function (erro) {
                            console.log("Houve um erro: " + erro);
                        });
                    }
                    else if ((result[x].FOTO != 'OK' && result[x].FOTO != '') && result[x].DATA_VENDA != '') {
                        Produto.create({

                            codigo: result[x].CODIGO,
                            tipo: result[x].TIPO,
                            descricao: result[x].DESCRICAO,
                            sexo: result[x].SEXO,
                            tamanho: result[x].TAM,
                            grupo: result[x].GRUPO,
                            preco_custo: result[x].PRECO_CUSTO,
                            porcentagem: result[x].PORCENTAGEM,
                            preco_venda: result[x].PRECO_VENDA,
                            data_venda: result[x].DATA_VENDA,
                            vendido: result[x].VENDIDO,
                            pago: result[x].PAGO,
                            foto: result[x].FOTO


                        }).then(function () {
                            console.log("Cadastrado com sucesso!");
                        }).catch(function (erro) {
                            console.log("Houve um erro: " + erro);
                        });
                    }
                    else if ((result[x].FOTO != 'OK' && result[x].FOTO != '') && result[x].DATA_VENDA == '') {
                        Produto.create({

                            codigo: result[x].CODIGO,
                            tipo: result[x].TIPO,
                            descricao: result[x].DESCRICAO,
                            sexo: result[x].SEXO,
                            tamanho: result[x].TAM,
                            grupo: result[x].GRUPO,
                            preco_custo: result[x].PRECO_CUSTO,
                            porcentagem: result[x].PORCENTAGEM,
                            preco_venda: result[x].PRECO_VENDA,
                            data_venda: '01-01-1000',
                            vendido: result[x].VENDIDO,
                            pago: result[x].PAGO,
                            foto: result[x].FOTO


                        }).then(function () {
                            console.log("Cadastrado com sucesso!");
                        }).catch(function (erro) {
                            console.log("Houve um erro: " + erro);
                        });
                    }
                }
            }
        })
        res.redirect("/menu/listar-produtos");
    })

}

{// ###################################### ROTA DE DESPESAS ####################################### //


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
        xlsxj({
            input: __dirname + "/public/" + req.file.originalname,
            output: "output.json"
        }, function (err, result) {
            if (err) {
                console.error(err);
            } else {

                var count = Object.keys(result).length;

                for (x = 0; x < count; x++) {

                    Despesa.create({

                        data: result[x].DATA,
                        descricao: result[x].DESCRICAO,
                        valor: result[x].VALOR,
                        observacao: result[x].OBSERVACAO,

                    }).then(function () {
                        console.log("Cadastrado com sucesso!");
                    }).catch(function (erro) {
                        res.send("Houve um erro: " + erro);
                    });
                }
            }
        })
        res.redirect("/menu/listar-despesas");
    })

    router.post("/menu/downloadDespesasXLSX", (req, res) => {

        Despesa.findAll().then((despesas) => { // .all() trocado atualmente por .findAll()

        })
    })


}

{ // ################################# ROTA DE FORNECEDORES ####################################### //

    router.get("/menu/cadastro-fornecedor", (req, res) => {
        res.render('admin/cadastro-fornecedor.html');
    });

    router.get("/menu/listar-fornecedores", (req, res) => {
        res.render('admin/listar-fornecedores.html');
    });

    router.get("/menu/importar-fornecedores", (req, res) => {
        res.render('admin/importar-fornecedores.html');
    });

    router.post("/menu/saveFornecedor", (req, res) => {
        Fornecedor.create({

            nome: req.body.nome,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            cep: req.body.cep,
            municipio: req.body.municipio,
            estado: req.body.estado,
            telefone: req.body.telefone,
            celular: req.body.celular,
            email: req.body.email,
            cnpj_cpf: req.body.cnpj_cpf,
            grupo: req.body.grupo,
            situacao: req.body.situacao,
            data_nascimento: req.body.data_nascimento,
            observacao: req.body.observacao,

        }).then(function () {
            res.redirect("./listar-Fornecedores");
        }).catch(function (erro) {
            res.send("Houve um erro: " + erro);
        })
    });

    router.post("/menu/sendFornecedores", (req, res) => { // busca no banco de dados(fornecedores)
        Fornecedor.findAll().then((fornecedores) => { // .all() trocado atualmente por .findAll()
            res.send(fornecedores)
        })
    });

    router.post("/menu/uploadFornecedoresXLSX", upload.single("planilha"), (req, res, next) => {
        xlsxj({
            input: __dirname + "/public/" + req.file.originalname,
            output: "output.json"
        }, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                var count = Object.keys(result).length;

                for (x = 0; x < count; x++) {

                    Fornecedor.create({

                        nome: result[x].NOME,
                        endereco: result[x].ENDERECO,
                        bairro: result[x].BAIRRO,
                        cep: result[x].CEP,
                        municipio: result[x].MUNICIPIO,
                        estado: result[x].ESTADO,
                        telefone: result[x].TELEFONE,
                        celular: result[x].CELULAR,
                        email: result[x].EMAIL,
                        cnpj_cpf: result[x].CNPJ_CPF,
                        grupo: result[x].GRUPO,
                        situacao: result[x].SITUACAO,
                        data_nascimento: result[x].DATA_NASCIMENTO,
                        observacao: result[x].OBSERVACAO,

                    }).then(function () {
                        console.log("Cadastrado com sucesso!");
                    }).catch(function (erro) {
                        console.log("Houve um erro: " + erro);
                    });
                }
            }
        })
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