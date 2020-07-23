const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let campus = {};

campus.add = (req, image) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into campus (courseid,priority,image,description,title,domain,date) values (?,?,?,?,?,?,CURDATE())',
      [req.courseid, req.priority, image, req.description, req.title, req.domain], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

campus.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from campus where (courseid)=(?)',
      [req.courseid], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

campus.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from campus',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
module.exports = campus;
