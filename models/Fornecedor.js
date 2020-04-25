const db = require('./db'); //Importa a conexão com o banco criada em db.js

const Fornecedor = bd.define('fornecedor', {
    nome: {
        type: Sequelize.STRING
    },
    endereco: {
        type: Sequelize.STRING
    },
    descricao: {
        type: Sequelize.STRING
    },
    bairro: {
        type: Sequelize.STRING
    },
    cep: {
        type: Sequelize.INTEGER
    },
    municipio: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING
    },

    telefone: {
        type: Sequelize.STRING
    },

    celular: {
        type: Sequelize.STRING
    },

    email: {
        type: Sequelize.STRING
    },

    cnpj_cpf: {
        type: Sequelize.STRING
    },

    grupo: {
        type: Sequelize.STRING
    },

    situacao: {
        type: Sequelize.STRING
    },

    data_nascimento: {
        type: Sequelize.DATE
    },

    observacao: {
        type: Sequelize.STRING
    }

})

Fornecedor.sync({force: true}) // -> sincroniza o bd para coluna produtos, rodar para criar o banco ou resetá-lo