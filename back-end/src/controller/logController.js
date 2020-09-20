const LogModel = require('../models/Log'); // REQUISITANDO O ARQUIVO LOG QUE ESTÁ NA PASTA MODELS

// FUNÇÃO ASSÍNCRONA PARA LISTAR TODOS OS LOGS
const listar = async (req, res) => {
    const logModel = new LogModel(); // INSTÂNCIA DA CLASSE LOG
    try {
        const result = await logModel.listar(); // ESPERAR O RETORNO DO MÉTODO LIST, COM O AWAIT NOS ESPECIFICAMOS QUE É PRECISO ESPERAR UM RETORNO
        if(result.recordset.length > 0) {
            res.status(200).send(result.recordset); // RESPONDENDO AO CLIENT STATUS 200 E OS DADOS RETORNADOS
        }else {
            console.log('Não há logs cadastrados');
            res.status(204).send('Não há logs'); // RESPONDENDO AO CLIENT STATUS 406 E A MENSAGEM
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao buscar logs'); // CASO DE ALGUM ERRO, VAMOS RETORNAR AO CLIENT O STATUS 500 E A MENSAGEM
    }
}

// FUNÇÃO ASSÍNCRONA PARA CADASTRAR UM LOG
const criar = async (req, res) => {
    let { ip, tag } = req.body; // REQUISITANDO IP E TAG DO CORPO DA REQUISIÇÃO
    const logModel = new LogModel();
    try {
        const result = await logModel.criar(ip, tag);
        console.log('log gerado com sucesso');
        res.status(201).send(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao cadastrar usuário');
    }
}

// HABILITANDO CHAMAR AS FUNÇÕES ABAIXO EM OUTROS ARQUIVOS
module.exports = {
    listar,
    criar,
}