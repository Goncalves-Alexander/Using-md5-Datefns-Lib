const database = require('../config/db'); // REQUISITANDO O ARQUIVO DB QUE ESTÁ NA PASTA CONFIG

class Session { // CLASSE LOG QUE POSSUÍ VÁRIOS MÉTODOS

    // MÉTODO PARA ENCONTRAR EMAIL E SENHA DO USUÁRIO
    login(email, senha){
        const sql = `
            SELECT ra, nome, tag from usuarios 
            WHERE email = '${email}' AND senha = md5(${senha}); 
        `
        return database.comando(sql);
    }
}

module.exports = Session; // HABILITANDO CHAMAR A CLASSE SESSION EM OUTROS LUGAR