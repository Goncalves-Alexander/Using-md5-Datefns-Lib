const mysql = require('mysql');

const comando = function(sql) {
    
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'luxy',
            password: '+93619129@Lex',
            database: 'criptografiaMd5'
        });
        
        connection.connect();

        connection.query(sql, (error, results, fields) => {
            connection.end();
            if(error) reject(error);
            resolve(results);
        })
    })
}

module.exports = { comando }