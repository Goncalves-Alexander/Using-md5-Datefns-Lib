const database = require('../config/db'); // REQUERINDO CONEXÃO COM O BANCO DE DADOS
const DataHoraAtual = require('../config/dataHora'); // REQUISITANDO O ARQUIVO DATAHORA QUE ESTÁ NA PASTA CONFIG

class UsuarioSala { // CLASSE LOG QUE POSSUÍ VÁRIOS MÉTODOS

    // MÉTODO QUE LISTA TODAS AS VINCULAÇÕES DE SALA-USUARIO
    listar(ra) {
        const sql = `
            SELECT u.ra, u.nome as usuario, u.sexo, u.tag,
            sala.nome as sala, sala.ip, us.dia,
            convert(char(8),convert(time(0), us.horaInicial)) as horaInicial,
            convert(char(8),convert(time(0), us.horaFinal)) as horaFinal,
            us.idUsuarioSala 
            FROM usuarioSala as us JOIN usuarios as u
            ON us.usuarioRa = u.ra JOIN sala
            ON us.salaID = sala.idSala
            WHERE us.usuarioRa = ${ra} ORDER BY us.dia, us.horaInicial
        `
        return database.comando(sql);
    }

    // MÉTODO QUE LISTA TODAS AS VINCULAÇÕES DE SALA-USUARIO DAQUELE DIA
    listarSalasDia(ra) {
        const sql = `
                SELECT u.ra, u.nome as usuario, u.sexo, u.tag,
                sala.nome as sala, sala.ip, sala.idSala, us.dia,
                convert(char(8),convert(time(0), us.horaInicial)) as horaInicial,
                convert(char(8),convert(time(0), us.horaFinal)) as horaFinal,
                us.idUsuarioSala
                FROM usuarioSala as us JOIN usuarios as u
                ON us.usuarioRa = u.ra JOIN sala
                ON us.salaID = sala.idSala
                WHERE us.usuarioRa = ${ra}
                AND '${DataHoraAtual.numeroDia()}' = us.dia
        `
        return database.comando(sql);
    }

    // MÉTODO PARA CADASTRO DA VINCULAÇÃO SALA-USUÁRIO
    criar(tag, sala, dia, horaInicial, horaFinal) {
        const sql = `
            INSERT INTO usuarioSala(usuarioRa, salaId, dia, horaInicial, horaFinal)
            VALUES ((SELECT ra FROM usuarios WHERE tag = '${tag}'),
            (SELECT idSala FROM sala WHERE nome = '${sala}'),
            '${dia}', '${horaInicial}', '${horaFinal}')
        `
        return database.comando(sql);
    }

    // MÉTODO QUE ENCONTRA A VINCULAÇÃO ENTRE SALA-USUARIO
    encontrar(tag, ip) {
        const sql = `
            SELECT idUsuarioSala, usuarioRa, salaId, dia, horaInicial, horaFinal 
            FROM usuarioSala
            WHERE usuarioRa = (SELECT ra FROM usuarios WHERE tag = '${tag}')
            AND salaId = (SELECT idSala FROM sala WHERE ip = '${ip}')
            AND '${DataHoraAtual.horaAtual()}' >= usuarioSala.horaInicial
            AND '${DataHoraAtual.horaAtual()}' <= usuarioSala.horaFinal
            AND '${DataHoraAtual.numeroDia()}' = usuarioSala.dia  
        `
        return database.comando(sql);
    }

    atualizarDados(dia, horaInicial, horaFinal, idUsuarioSala) {
        const sql = `
        UPDATE usuarioSala SET dia = '${dia}',
        horaInicial = '${horaInicial}', horaFinal = '${horaFinal}'
        WHERE idUsuarioSala = ${idUsuarioSala};  
        `
        return database.comando(sql);
    }

    // MÉTODO PARA ALTERAÇÃO DA DATA E/OU HORA DIA
    deletarUsuarioSala(idUsuarioSala) {
        const sql = `
            DELETE FROM usuarioSala WHERE idUsuarioSala = ${idUsuarioSala}
        `
        return database.comando(sql);
    }

}

module.exports = UsuarioSala; // HABILITANDO CHAMAR A CLASSE USUARIOSALA EM OUTROS LUGAR