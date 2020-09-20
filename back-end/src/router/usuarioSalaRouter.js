const express = require('express'); // REQUISITANDO A BIBLIOTECA EXPRESS
const router = express.Router(); // CHAMANDO A FUNÇÃO ROUTER DO EXPRESS

const UsuarioSalaController = require('../controller/usuarioSalaController'); // REQUISITANDO USUARIOSALACONTROLLER QUE ESTA DENTRO DA PÁFINA CONTROLLER

router.get('/:ra', (req, res) => UsuarioSalaController.listar(req, res)); // ROTA PARA LISTAR SALAS VINCULADAS COM UM USUÁRIO ESPECÍFICO
router.get('/listarDia/:ra', (req, res) => UsuarioSalaController.listarSalasDia(req, res)); // ROTA PARA LISTAR SALAS VINCULADAS NAQUELE DIA
router.get('/user/:tag/:ip', (req, res) => UsuarioSalaController.liberarLocal(req, res)); // ROTA PARA ENCONTRAR UMA VINCULAÇÃO DA SALA-USUARIO (REQUISIÇÃO DO LOLIN)
router.get('/userWeb/:tag/:ip', (req, res) => UsuarioSalaController.liberarWeb(req, res)); // ROTA PARA ENCONTRAR UMA VINCULAÇÃO DA SALA-USUARIO (REQUISIÇÃO DO WEB)
router.post('', (req, res) => UsuarioSalaController.criar(req, res)); // ROTA PARA VINCULAR SALA-USUARIO
router.put('', (req, res) => UsuarioSalaController.atualizarDados(req, res)); // ROTA PARA ALTERAR HORA E/OU DATA DE UMA VINCULAÇÃO
router.delete('/:idUsuarioSala', (req, res) => UsuarioSalaController.deletarUsuarioSala(req, res)); // ROTA PARA DELETAR VINCULAÇÃO

router.get('/usuarioSala/:tag/:ip', (req, res) => UsuarioSalaController.liberarSalaWeb(req, res));
router.get('/travarSala/:tag/:ip', (req,res) => UsuarioSalaController.travarSalaWeb(req, res));

module.exports = router;