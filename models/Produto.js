const db = require('./db'); //Importa a conexão com o banco criada em db.js

const Produto = bd.define('produto', {
    codigo: {
        type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.STRING
    },
    descricao: {
        type: Sequelize.STRING
    },
    sexo: {
        type: Sequelize.STRING
    },
    tamanho: {
        type: Sequelize.STRING
    },
    grupo: {
        type: Sequelize.STRING
    },
    preco_custo: {
        type: Sequelize.FLOAT
    },
    porcentagem: {
        type: Sequelize.INTEGER
    },
    preco_venda: {
        type: Sequelize.FLOAT
    },
    foto: {
        type: Sequelize.BOOLEAN
    },
    data_venda: {
        type: Sequelize.STRING
    }

})

Produto.sync({force: true})  //-> sincroniza o bd para coluna produtos, rodar para criar o banco ou resetá-lo