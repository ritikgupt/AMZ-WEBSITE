const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});

let student = {};

student.add = (enroll_id, name, institute, branch, mobile, email, password, img_url) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into student (enroll_id,name,institute,branch,mobile,email,password,img_url) values (?,?,?,?,?,?,?,?)',
      [enroll_id, name, institute, branch, mobile, email, password, img_url], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

student.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from student where (studentid)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

student.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from student',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

student.showOne = (id) => {

  return new Promise((resolve, reject) => {
    pool.query('Select * from student where (enroll_id)=(?)',
      [id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

student.request = async(type, heading, description, userid, filepath) => {
  try {
    const a = await pool.query('Insert into request (type,heading,description,enroll_id,img_url) values (?,?,?,?,?)',
      [type, heading, description, userid, filepath]);
    return a;
  } catch (e){
    throw e;
  }
};

student.project = async(heading, description, filepath, userid) => {
  try {
    const a = await pool.query('insert into project (heading,description,img_url,enroll_id) values (?,?,?,?)',
      [heading, description, filepath, userid]);
    console.log(a);
    return a;
  } catch (e){
    throw e;
  }
};

module.exports = student;
