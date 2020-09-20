const SessionModel = require('../models/Session'); // REQUISITANDO O ARQUIVO SESSION QUE ESTÁ NA PASTA MODELS

// FUNÇÃO ASSÍNCRONA REALIZAR LOGIN
const login = async (req, res) => {
    let { email, senha } = req.body; // REQUISITANDO DO CORPO DA REQUISIÇÃO O EMAIL E A SENHA
    
    const sessionModel = new SessionModel(); // INSTÂNCIA DA CLASSE SALA
    try {
        const result = await sessionModel.login(email, senha); // ESPERAR O RETORNO DO MÉTODO LOGIN, COM O AWAIT NOS ESPECIFICAMOS QUE É PRECISO ESPERAR UM RETORNO
        if(result.length == 1){
            res.status(200).send(result.recordset); // RESPONDENDO AO CLIENT STATUS 200 E OS DADOS RETORNADOS
        }else {
            console.log('Usuário não cadastrado');
            res.status(204).send("Usuário não encontrado"); // RESPONDENDO AO CLIENT STATUS 406 E A MENSAGEM
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao buscar usuário'); // CASO DE ALGUM ERRO, VAMOS RETORNAR AO CLIENT O STATUS 500 E A MENSAGEM
    }
}

// HABILITANDO CHAMAR AS FUNÇÕES ABAIXO EM OUTROS ARQUIVOS
module.exports = {
    login
}