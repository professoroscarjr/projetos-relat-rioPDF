const db = require('../conexao/db');

const Dados = {

    getCidadetoPDF: (cidade) => {
        
        const sql = 'SELECT * FROM users WHERE cidade = ?';
        return new Promise((resolve, reject) => {
            db.query(sql, [cidade], (err, results) => {
                if (err ) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
};
module.exports = Dados; 