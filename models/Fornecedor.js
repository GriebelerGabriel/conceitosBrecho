const db = require('./db'); //Importa a conexão com o banco criada em db.js
const Fornecedor = db.bd.define('fornecedores', {

    nome: {
        type: db.Sequelize.STRING
    },
    endereco: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.STRING
    },
    bairro: {
        type: db.Sequelize.STRING
    },
    cep: {
        type: db.Sequelize.STRING
    },
    municipio: {
        type: db.Sequelize.STRING
    },
    estado: {
        type: db.Sequelize.STRING
    },

    telefone: {
        type: db.Sequelize.STRING
    },

    celular: {
        type: db.Sequelize.STRING
    },

    email: {
        type: db.Sequelize.STRING
    },

    cnpj_cpf: {
        type: db.Sequelize.STRING
    },

    grupo: {
        type: db.Sequelize.STRING
    },

    situacao: {
        type: db.Sequelize.STRING
    },

    data_nascimento: {
        type: db.Sequelize.DATE
    },

    observacao: {
        type: db.Sequelize.TEXT
    }

})

Fornecedor.sync({force: true}) // -> sincroniza o bd para coluna produtos, rodar para criar o banco ou resetá-lo