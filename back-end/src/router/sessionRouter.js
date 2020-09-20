const express = require('express'); // REQUISITANDO A BIBLIOTECA EXPRESS
const router = express.Router(); // CHAMANDO A FUNÇÃO ROUTER DO EXPRESS

const SessionController = require('../controller/sessionController'); // REQUISITANDO O ARQUIVO SESSIONCONTROLLER QUE ESTA DENTRO DA PASTA CONTROLLER

router.post('', (req, res) => SessionController.login(req, res)); // ROTA PARA LOGIN

module.exports = router;