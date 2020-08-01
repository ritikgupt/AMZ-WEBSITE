const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let events = {};

events.add = (title, university, data, image) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into events (img_url,university,title,data) values (?,?,?,?)',
      [image, university, title, data], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

events.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from events where (id)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

events.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from events order by data desc',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
module.exports = events;
