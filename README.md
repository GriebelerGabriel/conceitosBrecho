<h2> --------- To run on Your PC --------- </h2>
<br>

<h1> Para Instalar as Dependências: -> passos para WINDOWS</h1> <br><br>

1º instalar nodejs -> https://nodejs.org/en/ (backend) <br>
2º instalar mysql ->  https://dev.mysql.com/downloads/installer/ (Database), instalador para windows <br>
3º instalar Sequelize(for database connection) -> npm install --save sequelize <br>
4º instalar sqlite3 -> npm install sqlite3 --save <br>
5º instalar express -> $ npm install express --save <br>

// DEVE SER INSTALADO COMO SERVIDOR // <br>

<h1> Para Instalar as Dependências: -> passos para LINUX</h1>

1º No terminal, com atalho CTRL+ALT+T digite os seguintes comandos: <br><br>

<h1> IMPORTANTE! Configuração do MYSQL(banco de dados)</h1> 
<br>
<h1> OBS: CONFIGURAR O MYSQL COM UM USUARIO: root E SENHA: password </h1><br>
<br>
<h1> Configuração WINDOWS: </h1><br><br>
1º  veja em: https://www.youtube.com/watch?v=OUZIaoCSJas <br>

2º Para iniciar o mysql via terminal(cmd) utilize mysql -u root -p <br>
3º Digite a senha: password

<h1> Configuração LINUX: </h1><br><br>

1º no terminal digite os comandos: <br>
2º sudo mysql_secure_installation <br>
3º Para escolher o nivel de dificuldade da senha digite(sem aspas) '0'(LOW)<br>
4º Na escolha da senha do usuário root digite(sem aspas): 'password'<br>
5º Digite novamente a senha(sem aspas): 'password'<br>
6º Para continuar com a senha escolhida, digite(sem aspas): 'y'<br>

-----> Configurado <br>
<h1> CRIANDO O BANCO DE DADOS </h1>

<br>

<h1> CRIANDO O BANCO DE DADOS: -> Passos em qualquer terminal cmd(windows) ou no do linux: </h1><br><br>

1º no terminal digite os comandos: <br>
2º sudo mysql -u root -p password <br>
3º após entrar no mysql, digite o comando SQL: <br>
4º CREATE DATABASE conceitosbd; <br>
5º quit <br><br>

<h1> Criando as entidades do banco de dados(fornecedor, despesas, produtos): </h1>

<h1> Após isso, deve se entrar na pasta conceitosBrecho(via terminal ou cmd) onde esta o projeto clonado(area de trabalho, etc) COMO ADMIN</h1><br><br>

<h1> <strong>IMPORTANTE:</strong></h1> Ao realizar as proximas etapas deve-se descomentar as ultimas linhas dos seguintes arquivos(Fornecedor.js, Despesas.js e Produtos.js), e, após rodar as proximas linhas, deve-se comentá-las(colocar // antes delas) novamente caso contrário irá sempre criar tabelas novas para cada fornecedor, despesa e produto.<br><br>

1º cd models <br>
2º node Fornecedor.js <br>
3º node Produtos.js <br> 
4º node Despesas.js <br> 
5º <strong> comentar novamente as linhas descritas no aviso anterio. </strong> <br><br>

<h1> Para rodar no servidor de aplicação local(Deixar ligado no CMD): </h1>
<br><br>
1º no terminal digite: cd .. <br>
2º node app.js <br>

<h1><strong>OBS:</Strong> os códigos do CMD deve serem rodados sem as ASPAS! </h1>

############## FEITO ##############
