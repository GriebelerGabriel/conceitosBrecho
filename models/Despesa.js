const db = require('./db'); //Importa a conexão com o banco criada em db.js
const Despesa = db.bd.define('despesas', {

    data: {
        type: db.Sequelize.DATEONLY
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
Despesa.sync()