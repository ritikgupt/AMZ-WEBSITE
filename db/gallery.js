const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});
let gallery = {};

gallery.add = (image, title) => {
  return new Promise((resolve, reject) => {
    pool.query('insert into gallery (img_url,title) values (?,?)',
      [image, title], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

gallery.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from gallery where (id)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
gallery.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from gallery',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

module.exports = gallery;
