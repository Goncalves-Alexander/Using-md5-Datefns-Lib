const database = require('../config/db'); // REQUISITANDO O ARQUIVO DB QUE ESTÁ NA PASTA CONFIG
const DataHoraAtual = require('../config/dataHora'); // REQUISITANDO O ARQUIVO DATAHORA QUE ESTÁ NA PASTA CONFIG

// CLASSE LOG QUE POSSUÍ VÁRIOS MÉTODOS
class Log {

    // MÉTODO QUE LISTA TODOS OS LOGS
    listar() {
        const sql = `
            SELECT l.idLogs,
            convert(char(8),convert(time(0), l.dataHora)) as hora,
            convert(char(10),convert(date, l.dataHora)) as dia,
            u.nome, sala.nome AS 'sala', l.statusAbertura
            FROM logAcesso as l JOIN usuarios as u
            ON l.fkUsuario = u.ra JOIN sala
            ON l.fkSala = sala.idSala
        `
        return database.comando(sql);
    }

    // MÉTODO PARA CADASTRO DE LOG
    criar(ip, tag, status) {
        const sql = `
            INSERT INTO logAcesso(fkSala, fkUsuario, dataHora, statusAbertura)
            VALUES
            ((SELECT sala.idSala FROM sala WHERE sala.ip = '${ip}'),
            (SELECT ra FROM usuarios WHERE tag = '${tag}'),
            '${DataHoraAtual.dataHoraAtual()}', '${status}')
        `
        return database.comando(sql);
    }
}

module.exports = Log; // HABILITANDO CHAMAR A CLASSE LAMPADA EM OUTROS LUGAR