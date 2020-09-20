// REQUERINDO CONEXÃO COM O BANCO DE DADOS
const database = require('../config/db');

class User { // CLASSE LOG QUE POSSUÍ VÁRIOS MÉTODOS
    
    // MÉTODO QUE LISTA TODOS OS USUÁRIOS
    listar() {
        const sql = `
            SELECT ra, nome, sexo, email, tag
            FROM usuarios
        `
        return database.comando(sql);
    }

    // MÉTODO QUE PROCURA UM USUÁRIO ESPECÍFICP
    encontrar(ra) {
        const sql = `
            SELECT ra, nome, sexo, email, tag FROM usuarios
            WHERE statusAtividade = 'A' AND ra = ${ra}
        `
        return database.comando(sql);
    }

    // MÉTODO PARA CADASTRO DE USUAŔIO
    criar(nome, sexo, email, senha, tag, statusAtividade) {
        const sql = `
            INSERT INTO usuarios(nome, sexo, email, senha, tag, statusAtividade)
            VALUES
            ('${nome}', '${sexo}', '${email}', md5('${senha}'), '${tag}', '${statusAtividade}');
        `
        return database.comando(sql);
    }

    // MÉTODO PARA DESATIVAR USUÁRIO
    desativar(ra) {
        const sql = `
            UPDATE usuarios SET statusAtividade = 'N'
            WHERE ra = ${ra};
        `
        return database.query(sql);
    }

    // MÉTODO PARA ATIVAR USUÁRIO
    ativar(ra) {
        const sql = `
            UPDATE usuarios SET statusAtividade = 'A'
            WHERE ra = ${ra};
        `
        return database.comando(sql);
    }

    // MÉTODO PARA ALTERAR O NOME DO USUÁRIO
    alterarNome(nome, ra) {
        const sql = `
            UPDATE usuarios SET nome = '${nome}'
            WHERE ra = ${ra}
        `
        return database.comando(sql);
    }
}

module.exports = User; // HABILITANDO CHAMAR A CLASSE USER EM OUTROS LUGAR