const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let admin = {};

admin.add = (id, password) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into admin (id,password) values (?,?)',
      [id, password], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
admin.deleteAll = () => {

  return new Promise((resolve, reject) => {
    pool.query('delete from admin', (err, results) => {
      if (err)
        return reject(err);
      return resolve(results);
    });
  });
};
admin.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from admin where (username)=(?)',
      [req.username], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
admin.edit = (req, request) => {

  return new Promise((resolve, reject) => {
    pool.query('update admin set image=?,username=?,branch=?,college=?,email=?,mobile=? where username=?',
      [req.image, req.username, req.branch, req.college, req.email, req.mobile, request.username]
      , (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
admin.update = (password, username) => {

  return new Promise((resolve, reject) => {
    pool.query('update admin set password=? where username=?',
      [password, username]
      , (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
admin.login = (req) => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from admin where username=?', [req.username],
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
admin.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from admin',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

admin.showOne = (id) => {

    return new Promise((resolve, reject) => {
      pool.query('Select * from admin where (id)=(?)',
        [id], (err, results) => {
          if (err)
            return reject(err);
          return resolve(results);
        });
    });
  };

module.exports = admin;
