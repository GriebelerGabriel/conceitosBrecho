// Carregando Módulos
const express = require('express');
const app = express();
const admin = require('./routes/admin.js') // linka pasta admin das rotas para este arquivo
const path = require("path")

// Public
app.use(express.static(path.join(__dirname, "/public"))) 
// seta a pasta public de arquivos estaticos, contendo o CSS (necessário vincular nas paginas)//

// Renderização --> css e Imagens

app.set('views', __dirname + '/views'); // seta pasta de views para renderização posterior
app.engine('html', require('ejs').renderFile); //seta .html para realizar a renderização nos HTML files
app.set('view engine', 'ejs'); // seta a engine para a renderização das paginas

app.set('assets', __dirname + '/assets');
app.engine('jpeg', require('ejs').renderFile);
app.set('view engine', 'ejs');


// Rotas
    app.use('/', admin);

// servidor local HTTP
const PORT = 8081;
app.listen(PORT, ()=>{
    console.log("Server UP! acesse em -> http://localhost:8081/");  
});
