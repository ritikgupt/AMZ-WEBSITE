const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let general = {};

general.add = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into general (name,email,number,message) values (?,?,?,?)',
      [req.name, req.email, req.number, req.message], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

module.exports = general;
