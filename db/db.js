const mysql = require('mysql')
const pool = mysql.createPool({
    password:'Ritikgupta10$',
    user:'root',
    database:'AMZ_WEBSITE',
    host:'localhost',
    port:'3306'
});
let amzdb={};

amzdb.add_slider = (req) =>{
    console.log('hello');
    return new Promise((resolve, reject) => {
        pool.query('insert into home_slider (img_url) values (?,CURDATE())', 
        [req.img_url], (err,results) =>{
            if(err)
            return reject(err);
            return resolve(results);
        });
    });
}

module.exports = amzdb