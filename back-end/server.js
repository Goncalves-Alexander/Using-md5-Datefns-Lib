// REQUISITANDO AS BIBLIOTECAS NODEJS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express(); // CRIANDO UMA INSTANCIA DO EXPRESS
server.use(express.json()); // HABILITANDO TRANSFERENCIA DE DADOS DO TIPO JSON
server.use(cors()); // HABILITANDO QUE QUALQUER APLICAÇÃO ACESSE NOSSA API

server.use(bodyParser.json()); // HABILITANDO PEGAR CORPO DA REQUISÃO EM JSON
server.use(bodyParser.urlencoded({ extended: true }));

// ROTAS
    // CHAMANDO AS ROTAS
server.use('/usuarios', require('./src/router/userRouter'));
server.use('/login', require('./src/router/sessionRouter'));
server.use('/usuariosSalas', require('./src/router/usuarioSalaRouter'));

// SERVIDOR
    // INICIALIZANDO O SERVIDOR 

const port = process.env.port || 3333;

server.listen(port, () =>  console.log('Servidor rodando na porta ' + port));