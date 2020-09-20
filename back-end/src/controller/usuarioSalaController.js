const UsuarioSalaModel = require('../models/UsuarioSala'); // REQUISITANDO O ARQUIVO USUARIOSALA QUE ESTÁ NA PASTA MODELS
const LogModel = require('../models/Log'); // REQUISITANDO O ARQUIVO LOG QUE ESTÁ NA PASTA MODELS
const Liberar = require('../config/liberacao'); // REQUISITANDO O ARQUIVO LIBERAR QUE ESTÁ NA PASTA CONFIG

// FUNÇÃO ASSINCRONA QUE LISTA TODAS AS VINCULAÇÕES DE SALA-USUARIO
const listar = async (req, res) => {
    let { ra } = req.params; // REQUISITANDO RA DO PARÂMETRO DA REQUISIÇÃO
    const usuarioSalaModel = new UsuarioSalaModel(); // INSTÂNCIA DA CLASSE USUARIOSALA
    try {
        const result = await usuarioSalaModel.listar(ra); // ESPERAR O RETORNO DO MÉTODO LIST, COM O AWAIT NOS ESPECIFICAMOS QUE É PRECISO ESPERAR UM RETORNO
        if(result.recordset.length > 0) {
            res.status(200).send(result.recordset); // RESPONDENDO AO CLIENT STATUS 200 E OS DADOS RETORNADOS
        }else {
            console.log('Usuário não vinculado');
            res.status(204).send("Não há cadastro"); // RESPONDENDO AO CLIENT STATUS 406 E A MENSAGEM
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao buscar salas disponívies'); // CASO DE ALGUM ERRO, VAMOS RETORNAR AO CLIENT O STATUS 500 E A MENSAGEM
    }
}

// FUNÇÃO ASSÍNCRONA QUE LISTA TODAS AS VINCULAÇÕES DE SALA-USUARIO DAQUELE DIA
const listarSalasDia = async (req, res) => {
    let { ra } = req.params;
    const usuarioSalaModel = new UsuarioSalaModel();
    try {
        const result = await usuarioSalaModel.listarSalasDia(ra);
        if(result.recordset.length > 0) {
            res.status(200).send(result.recordset);
        }else {
            console.log('Usuário não vinculado');
            res.status(204).send("Não há cadastro");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao buscar salas disponívies');
    }
}

// FUNÇÃO ASSÍNCRONA QUE CRIA UMA VINCULAÇÃO ENTRE SALA-USUARIO
const criar = async (req, res) => {
    let {tag, sala, dia, horaInicial, horaFinal} = req.body; // REQUISITANDO TAG, SALA, DIA, HORAINICIAL E HORA FINAL DO CORPO DA REQUISIÇÃO
    const usuarioSalaModel = new UsuarioSalaModel();
    try {
        const result = await usuarioSalaModel.criar(tag, sala, dia, horaInicial, horaFinal);
        console.log('Cadastro realizado com sucesso');
        res.status(200).send(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao realizar cadastro');
    }
}

// FUNÇÃO ASSÍNCRONA QUE ENCONTRA A VINCULAÇÃO ENTRE O USUARIO E SALA
    // ESSA REQUISIÇÃO É ENVIDA DO LOLIN
const liberarLocal = async (req, res) => {
    let { tag, ip } = req.params;

    const logModel = new LogModel();
    const usuarioSalaModel = new UsuarioSalaModel();
    try {
        const result = await usuarioSalaModel.encontrar(tag, ip);
        if(result.recordset.length < 1) { // SE NÃO ENCONTRAR NÃO LIBERA A TRAVA
            logModel.criar(ip, tag, 'N');
            console.log('NÃO LIBEROU');
            res.status(401).json({ error: 'Não autorizado' })
        }else { // SE ENCONTRAR LIBERA
            logModel.criar(ip, tag, 'S');
            console.log('LIBEROU');
            res.status(200).send(result.recordset);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao procurar usuário')
    }
}

// FUNÇÃO ASSÍNCRONA QUE ENCONTRA A VINCULAÇÃO ENTRE O USUARIO E SALA
    // ESSA REQUISIÇÃO É ENVIDA DA PÁGINA WEB
const liberarWeb = async (req, res) => {
    let { tag, ip } = req.params;

    const logModel = new LogModel();
    const usuarioSalaModel = new UsuarioSalaModel();
    try {
        const result = await usuarioSalaModel.liberar(tag, ip);
        if(result.recordset.length < 1) {
            Liberar.negar(ip);
            logModel.criar(ip, tag, 'N');
            console.log('NÃO LIBEROU');
            res.status(400).json({ error: 'Não autorizado' });
        }else {
            Liberar.liberar(ip);
            logModel.criar(ip, tag, 'S');
            console.log('LIBEROU');
            res.status(200).send(result.recordset);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao procurar usuário')
    }
}

// FUNÇÃO ASSÍNCRONA PARA FAZER ALTERAÇÃO DE DIA E/OU HORA DA VINCULAÇÃO DO SALA-USUARIO
const atualizarDados = async (req, res) => {
    let { dia, horaInicial, horaFinal, id } = req.body;

    const usuarioSalaModel = new UsuarioSalaModel();
    try {
        await usuarioSalaModel.atualizarDados(dia, horaInicial, horaFinal, id);
        console.log('Horário alterado com sucesso');
        res.status(200).send('Horario alterado com sucesso');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao alterar horario')
    }
}

// FUNÇÃO ASSÍNCRONA QUE DELETA VINCULAÇÃO SALA-USUARIO
const deletarUsuarioSala = async (req, res) => {
    let { idUsuarioSala } = req.params;

    const usuarioSalaModel = new UsuarioSalaModel();
    try {
        await usuarioSalaModel.deletarUsuarioSala(idUsuarioSala);
        console.log('Relacionamento deletado com sucesso');
        res.status(200).send('Relacionamento deletado com sucesso');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao deletar relacionamento')
    }
}

const liberarSalaWeb = async (req, res) =>
{
    let { tag, ip } = req.params;

    const usuarioSalaModel = new UsuarioSalaModel();
    const logModel = new LogModel();

    try {
        const result = await usuarioSalaModel.encontrar(tag, ip);
        if(result.recordset.length < 1)
        {
            Liberar.negar(ip);
            logModel.criar(ip, tag, 'N');
            console.warn('Não liberou');
            res.status(400).json({error: 'não autorizado'});
        }else{
            Liberar.destravar(ip);
            logModel.criar(ip, tag, 'A');
            console.log('Liberou');
            res.status(200).send(result.recordset);
        }
    }catch(error)
    {
        console.log(error);
        res.status(500).send('Erro ao liberar');
    }

}

const travarSalaWeb = async (req,res) => {
    let { tag, ip } = req.params;

    const usuarioSalaModel = new UsuarioSalaModel();

    const result = await usuarioSalaModel.encontrar(tag, ip);
    if(result.recordset.length < 1){
        console.warn('Não liberou');
        res.status(400).json({error: 'não autorizado'});
    }else{
        Liberar.travar(ip);
        console.log('Sala travada');
        logModel.criar(ip, tag, 'T');
        res.status(200).send(result.recordset);
    }
}

// HABILITANDO CHAMAR AS FUNÇÕES ABAIXO EM OUTROS ARQUIVOS
module.exports = {
    listar,
    listarSalasDia,
    criar,
    liberarLocal,
    liberarWeb,
    atualizarDados,
    deletarUsuarioSala,
    liberarSalaWeb,
    travarSalaWeb
}
