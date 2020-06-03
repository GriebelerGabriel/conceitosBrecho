const express = require('express');
const router = express.Router();
const Despesa = require('../models/Despesa');
const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');
const Sequelize = require('sequelize');
const multer = require('multer');

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
    console.log(req.body)
    
    /*Produto.findOne({
        where: { id: req.body.id }
    }).then(function (produto) {

        produto.foto = req.file.originalname;

        produto.save().then(()=>{
            res.redirect('back');
        })  
    })*/
    
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

router.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
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
    var whereQuery = {} // cria o objeto que vai receber os dados da DESPESA

    if (req.body.data) { // verifica se existe algum dado nao nulo ou vazio;
        whereQuery.data = req.body.data // set o dado dentro do objeto que foi criado
    }
    if (req.body.valor) {
        whereQuery.valor = req.body.valor
    }
    if (req.body.observacao) {
        whereQuery.observacao = req.body.observacao
    }
    if (req.body.descricao) {
        whereQuery.descricao = req.body.descricao
    }

    Despesa.findAll({

        where: whereQuery

    }).then((despesas) => {
        res.send(despesas)
    })
})

router.post("/menu/importandoDespesa", (req, res) => {
    xlsxj = require("xlsx-to-json");
    xlsxj({
        input: __dirname + "/filesXLSX/write.xlsx",
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

}




module.exports = router;