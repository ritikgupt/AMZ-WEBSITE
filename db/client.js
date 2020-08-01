const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});
let client = {};

client.add = (image) => {
  console.log(image);
  return new Promise((resolve, reject) => {
    pool.query('insert into client (img_url) values (?)',
      [image], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

client.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from client where (id)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
client.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from client',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

module.exports = client;
