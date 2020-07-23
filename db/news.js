const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let news = {};

news.add = (req, image) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into news (img_url,description,heading,date) values (?,?,?,CURDATE())',
      [image, req.description, req.heading], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

news.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from news where (newsid)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

news.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from news',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
module.exports = news;
