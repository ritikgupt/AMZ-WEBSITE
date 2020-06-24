const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let internship = {};

internship.add = (req, image) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into internship (courseid,priority,image,description,title,domain,date) values (?,?,?,?,?,?,CURDATE())',
      [req.courseid, req.priority, image, req.description, req.title, req.domain], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
internship.deleteAll = () => {

  return new Promise((resolve, reject) => {
    pool.query('delete from internship', (err, results) => {
      if (err)
        return reject(err);
      return resolve(results);
    });
  });
};
internship.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from internship where (courseid)=(?)',
      [req.courseid], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
internship.edit = (req, request) => {

  return new Promise((resolve, reject) => {
    pool.query('update internship set image=?,description=?,title=?,domain=?,priority=? where courseid=?',
      [req.image, req.description, req.title, req.domain, req.priority, request.courseid]
      , (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
internship.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from internship',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
module.exports = internship;
