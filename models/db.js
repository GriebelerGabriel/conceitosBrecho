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

module.exports = {      // faz a exportação do sequelizer e conexao com o banco
    Sequelize: Sequelize,
    bd: bd
}