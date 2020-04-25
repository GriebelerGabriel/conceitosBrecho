const express = require('express');
const router = express.Router();


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

router.get("/menu/editar-produto", (req,res) =>{
    res.render('admin/editar-produto.html');
});

router.get("/menu/importar-produto", (req,res) =>{
    res.render('admin/importar-produto.html');
});

// -------- Rotas Despesa ----------- //
router.get("/menu/cadastro-despesa", (req,res) =>{
    res.render('admin/cadastro-despesa.html');
});

router.get("/menu/editar-despesa", (req,res) =>{
    res.render('admin/editar-despesa.html');
});

router.get("/menu/importar-despesa", (req,res) =>{
    res.render('admin/importar-despesa.html');
});

// ---------- Rotas Fornecedor -------- //
router.get("/menu/cadastro-fornecedor", (req,res) =>{
    res.render('admin/cadastro-fornecedor.html');
});

router.get("/menu/editar-fornecedor", (req,res) =>{
    res.render('admin/editar-fornecedor.html');
});

router.get("/menu/importar-fornecedor", (req,res) =>{
    res.render('admin/importar-fornecedor.html');
});



module.exports = router;
