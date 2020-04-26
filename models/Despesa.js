const db = require('./db'); //Importa a conexão com o banco criada em db.js
const Despesa = db.bd.define('despesas', {

    data: {
        type: db.Sequelize.DATE
    },
    descricao: {
        type: db.Sequelize.TEXT
    },
    valor: {
        type: db.Sequelize.FLOAT
    },
    observacao: {
        type: db.Sequelize.TEXT
    }

})

module.exports = Despesa;
//Despesa.sync({force: true}) // -> sincroniza o bd para coluna produtos, rodar para criar o banco ou resetá-lo