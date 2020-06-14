const mysql = require('mysql')
const pool = mysql.createPool({
    password:'Ritikgupta10$',
    user:'root',
    database:'AMZ_WEBSITE',
    host:'localhost',
    port:'3306'
});
let trusted={};

trusted.add = (req) =>{
    
    return new Promise((resolve, reject) => {
        pool.query('insert into trusted (img_url) values (?)', 
        [req.img_url], (err,results) =>{
            if(err)
            return reject(err);
            return resolve(results);
        });
    });
}

trusted.deleteAll = (req) =>{
    
    return new Promise((resolve, reject) => {
        pool.query('Delete from trusted', 
         (err,results) =>{
            if(err)
            return reject(err);
            return resolve(results);
        });
    });
}
trusted.deleteOne = (req) =>{
    
    return new Promise((resolve, reject) => {
        console.log(req.url)
        pool.query('Delete from trusted where (img_url)=(?)', 
        [req.url], (err,results) =>{
            if(err)
            return reject(err);
            return resolve(results);
        });
    });
}
trusted.show = () =>{
    return new Promise((resolve, reject) => {
        pool.query('Select * from trusted', 
         (err,results) =>{
            if(err)
            return reject(err);
            return resolve(results);
        });
    });
}

module.exports = trusted