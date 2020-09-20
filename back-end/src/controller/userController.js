const UserModel = require('../models/User'); // REQUISITANDO O ARQUIVO USER QUE ESTÁ NA PASTA MODELS

// FUNÇÃO ASSÍNCRONA PARA LISTAR TODOS OS USUÁRIOS
const listar = async (req, res) => {
    const userModel = new UserModel(); // INSTÂNCIA DA CLASSE SALA
    try {
        const result = await userModel.listar(); // ESPERAR O RETORNO DO MÉTODO LIST, COM O AWAIT NOS ESPECIFICAMOS QUE É PRECISO ESPERAR UM RETORNO
        if(result.recordset.length > 0) {
            res.status(200).send(result.recordset); // RESPONDENDO AO CLIENT STATUS 200 E OS DADOS RETORNADOS
        }
        else{
            console.log('Usuário não cadastrado');
            res.status(204).send("Não há usuários cadastrados"); // RESPONDENDO AO CLIENT STATUS 406 E A MENSAGEM
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao buscar usuários'); // CASO DE ALGUM ERRO, VAMOS RETORNAR AO CLIENT O STATUS 500 E A MENSAGEM
    }
};

// FUNÇÃO ASSÍNCRONA QUE ENCONTRA UM USUÁRIO APENAS
const encontrar = async (req, res) => {
    let { ra } = req.params; // REQUISITANDO RA DO PARÂMETRO DA REQUISIÇÃO
    
    const userModel = new UserModel();
    try {
        const result = await userModel.encontrar(ra);
        if(result.recordset.length > 0) {
            res.status(200).send(result.recordset);
        }
        else{
            console.log('Usuário não cadastrado');
            res.status(204).send("Não há usuários cadastrados");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao buscar usuários');
    }
};

// FUNÇÃO ASSÍNCRONA PARA CADASTRO DE USUÁRIO
const criar = async (req, res) => {
    let { nome, sexo, email, senha, tag } = req.body; // REQUISITANDO NOME, SEXO, EMAIL, SENHA, TAG
    let statusAtividade = 'A';
    const userModel = new UserModel();
    try {
        const result = await userModel.criar(nome, sexo, email, senha, tag, statusAtividade);
        console.log('Usuário cadastrado com sucesso');
        res.status(201).send(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao cadastrar usuário');
    }
};

// FUNÇÃO ASSÍNCRONA PARA DESATIVAR USUÁRIO
const desativar = async (req, res) => {
    const userModel = new UserModel();
    try {
        await userModel.desativar(req.params.ra);
        console.log('Usuário desativado com sucesso');
        res.status(200).send('Usuário desativado com sucesso');
    } catch (error) {
        console.log(error);
        res.status(401).send('Erro ao deletar usuário');
    }
}

// FUNÇÃO ASSÍNCRONA PARA ATIVAR USUÁRIO
const ativar = async (req, res) => {
    const userModel = new UserModel();
    try {
        await userModel.ativar(req.params.ra);
        console.log('Usuário ativado com sucesso');
        res.status(200).send('Usuário ativado');
    } catch (error) {
        console.log(error);
        res.status(401).send('Erro ao ativar usuário')
    }
}

// FUNÇÃO ASSÍNCRONA PARA ALTERAÇÃO DE NOME
const alterarNome = async (req, res) => {
    let { nome } = req.body;
    let { ra } = req.params;
    const userModel = new UserModel();
    try {
        await userModel.alterarNome(nome, ra);
        console.log('Nome alterado com sucesso');
        res.status(200).send('Nome alterado com sucesso');
    } catch (error) {
        console.log(error);
        res.status(401).send('Erro ao mudar o nome do usuário')
    }
}

// HABILITANDO CHAMAR AS FUNÇÕES ABAIXO EM OUTROS ARQUIVOS
module.exports = {
    listar,
    encontrar,
    criar,
    desativar,
    ativar,
    alterarNome
}