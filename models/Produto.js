const db = require('./db'); //Importa a conexão com o banco criada em db.js
const Produto = db.bd.define('produtos', {
    
    codigo: {
        type: db.Sequelize.STRING
    },
    tipo: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.STRING
    },
    sexo: {
        type: db.Sequelize.STRING
    },
    tamanho: {
        type: db.Sequelize.STRING
    },
    grupo: {
        type: db.Sequelize.STRING
    },
    preco_custo: {
        type: db.Sequelize.FLOAT
    },
    porcentagem: {
        type: db.Sequelize.INTEGER
    },
    preco_venda: {
        type: db.Sequelize.FLOAT
    },
    foto: {
        type: db.Sequelize.STRING
    },
    data_venda: {
        type: db.Sequelize.DATEONLY
    },
    vendido: {
        type: db.Sequelize.STRING
    },
    pago: {
        type: db.Sequelize.STRING
    }

})

module.exports = Produto;

//Produto.sync({force: true})  //-> sincroniza o bd para coluna produtos, rodar para criar o banco ou resetá-lo