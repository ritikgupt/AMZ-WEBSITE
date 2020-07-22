const mysql = require('mysql');
const pool = mysql.createPool({
  password: 'Ritikgupta10$',
  user: 'root',
  database: 'AMZ_WEBSITE',
  host: 'localhost',
  port: '3306',
});
let video = {};

video.add = (req, image) => {

  return new Promise((resolve, reject) => {
    pool.query('insert into video (video_url,img_url) values (?,?)',
      [req.video_url, image], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

video.deleteAll = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from video',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
video.deleteOne = (req) => {

  return new Promise((resolve, reject) => {
    pool.query('Delete from video where (videoid)=(?)',
      [req.id], (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};
video.show = () => {
  return new Promise((resolve, reject) => {
    pool.query('Select * from video',
      (err, results) => {
        if (err)
          return reject(err);
        return resolve(results);
      });
  });
};

module.exports = video;
