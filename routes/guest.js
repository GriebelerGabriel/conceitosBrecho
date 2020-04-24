const express = require('express');
const router = express.Router();


router.get("/", function(req,res){
    res.send("Login"); //mapeando para HTML, __dirname leva a raiz do projeto;
});

router.get("/menu", (req,res) =>{
    res.send("Menu"); // deve ser digitado na url pra funcionar
});
router.get("/produto", (req,res) =>{
    res.send("Cadastro Produtos"); // deve ser digitado na url pra funcionar
});

module.exports = router;