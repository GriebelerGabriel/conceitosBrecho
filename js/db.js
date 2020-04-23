const Sequelize = require('sequelize');
const bd = new Sequelize('conceitosbd', 'root', '12345', { //faz a conexão com o banco de dados
    host: "localhost",
    dialect: "mysql"
});

bd.authenticate().then(function(){ //verifica a conexão com o banco de dados
    console.log("conectado ao banco de dados!")  
}).catch(function(erro){
    console.log("Erro ao se conectar" + erro)
});

const Produtos = bd.define('produtos', {
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

// Produtos.sync({force: true})  -> sincroniza o banco de dados, coluna produtos