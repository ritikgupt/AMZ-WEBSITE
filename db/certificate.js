const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let certificate = {};

certificate.add = (enroll_id, name, institute) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into certificate (enroll_id,name,institute) values (?,?,?)',
      [enroll_id, name, institute], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

certificate.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from certificate where (certificateid)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

certificate.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from certificate',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
module.exports = certificate;
