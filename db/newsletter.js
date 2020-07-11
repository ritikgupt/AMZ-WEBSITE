const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let newsletter = {};

newsletter.add = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into newsletter (email) values (?)',
      [req.email], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

module.exports = newsletter;
