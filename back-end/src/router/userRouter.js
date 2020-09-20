const express = require('express'); // REQUISITANDO A BIBLIOTECA EXPRESS
const router = express.Router(); // CHAMANDO A FUNÇÃO ROUTER DO EXPRESS

const UserController = require('../controller/userController'); // REQUISITANDO O ARQUIVO USERCONTROLLER QUE ESTA DENTRO DA PASTA CONTROLLER

// CRIANDO AS ROTAS
router.get('', (req, res) => UserController.listar(req, res)); // ROTA PARA LISTAGEM DE USUÁRIOS
router.get('/:ra', (req, res) => UserController.encontrar(req, res)); // ROTA PARA LISTAGEM DE UM USUÁRIO ESPECÍFICO
router.post('', (req, res) => UserController.criar(req, res)); // ROTA PARA CADASTRO DE USUÁRIO
router.put('/:ra', (req, res) => UserController.alterarNome(req, res)); // ROTA PARA ALTERAÇÃO DO NOME
router.put('/desativar/:ra', (req, res) => UserController.desativar(req, res)); // ROTA PARA DESATIVAR USUÁRIO
router.put('/ativar/:ra', (req, res) => UserController.ativar(req, res)); // ROTA PARA ATIVAR USUÁRIO




module.exports = router;