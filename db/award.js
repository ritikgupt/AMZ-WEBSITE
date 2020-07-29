const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});
let award = {};

award.add = (image) => {
  console.log(image);
  return new Promise((resolve, reject) => {
    pool.query('insert into award (img_url) values (?)',
      [image], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

award.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from award where (id)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
award.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from award',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

module.exports = award;
