const Sequelize = require('sequelize');
const bd = new Sequelize('conceitosbd', 'root', 'password', { //faz a conexão com o banco de dados
    host: "localhost",
    dialect: "mysql"
});

bd.authenticate().then(function(){ //verifica a conexão com o banco de dados
    console.log("conectado ao banco de dados!")  
}).catch(function(erro){
    console.log("Erro ao se conectar" + erro)
});

module.exports = {      // faz a exportação do sequelize e conexao com o banco
    Sequelize: Sequelize,
    bd: bd
}