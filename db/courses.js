const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let courses = {};

courses.add = (req, image) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into courses (courseid,priority,image,description,title,domain,date) values (?,?,?,?,?,?,CURDATE())',
      [req.courseid, req.priority, image, req.description, req.title, req.domain], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
courses.deleteAll = () => {

  return new Promise((resolve, reject) => {
    pool.query('delete from courses', (err, results) => {
      if (err)
        return reject(err);
      return resolve(results);
    });
  });
};
courses.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from courses where (courseid)=(?)',
      [req.courseid], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
courses.edit = (req, request) => {

  return new Promise((resolve, reject) => {
    pool.query('update courses set image=?,description=?,title=?,domain=?,priority=? where courseid=?',
      [req.image, req.description, req.title, req.domain, req.priority, request.courseid]
      , (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
courses.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from courses',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
module.exports = courses;
