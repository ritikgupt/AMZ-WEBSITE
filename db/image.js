const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});
let image = {};

image.add = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into home_slider (img_url) values (?)',
      [req], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};


image.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    console.log(req.id);
    pool.query('Delete from home_slider where (id)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
image.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from home_slider',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

module.exports = image;
