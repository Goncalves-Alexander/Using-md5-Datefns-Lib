const express = require('express'); // REQUISITANDO A BIBLIOTECA EXPRESS
const router = express.Router(); // CHAMANDO A FUNÇÃO ROUTER DO EXPRESS

const LogController = require('../controller/logController'); // REQUISITANDO O ARQUIVO LOGCONTROLLER QUE ESTA DENTRO DA PASTA CONTROLLER

router.get('', (req, res) => LogController.listar(req, res)); // ROTA QUE LISTA TODOS OS LOGS
router.post('', (req, res) => LogController.criar(req, res)); // ROTA PARA CADASTRO DE LOGS

module.exports = router;