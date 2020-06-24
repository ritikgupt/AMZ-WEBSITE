const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});
let partner = {};

partner.add = (image) => {
  console.log(image);
  return new Promise((resolve, reject) => {
    pool.query('insert into partner (img_url) values (?)',
      [image], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

partner.deleteAll = () => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from partner',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
partner.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from partner where (id)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
partner.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from partner',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

module.exports = partner;
