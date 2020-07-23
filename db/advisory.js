const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let advisory = {};

advisory.add = (req, image) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into advisory (name,designation,img_url) values (?,?,?)',
      [req.name, req.designation, image], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

advisory.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from advisory where (advisoryid)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

advisory.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from advisory',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
module.exports = advisory;
