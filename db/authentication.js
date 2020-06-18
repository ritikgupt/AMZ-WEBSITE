const mysql = require('mysql')
const pool = mysql.createPool({
    password:'Ritikgupta10$',
    user:'root',
    database:'AMZ_WEBSITE',
    host:'localhost',
    port:'3306'
});

let auth={};

auth.add = (req,password) =>{
    
    return new Promise((resolve, reject) => {
        pool.query('insert into auth (username,mobile,branch,college,email,image,password,date) values (?,?,?,?,?,?,?,CURDATE())', 
        [req.username,req.mobile,req.branch,req.college,req.email,req.image,password], (err,results) =>{
            if(err)
            return reject(err);
            return resolve(results);
        });
    });
}
// auth.deleteAll = () =>{
    
//     return new Promise((resolve, reject) => {
//         pool.query('delete from auth', (err,results) =>{
//             if(err)
//             return reject(err);
//             return resolve(results);
//         });
//     });
// }
// auth.deleteOne = (req) =>{
    
//     return new Promise((resolve, reject) => {
//         pool.query('Delete from auth where (username)=(?)', 
//         [username], (err,results) =>{
//             if(err)
//             return reject(err);
//             return resolve(results);
//         });
//     });
// }
// auth.edit = (req,request) =>{
    
//     return new Promise((resolve, reject) => {
//         pool.query('update auth set img_url=?,description=?,heading=? where authid=?', 
//         [req.img_url,req.description,req.heading,request.id]
//         , (err,results) =>{
//             if(err)
//             return reject(err);
//             return resolve(results);
//         });
//     });
// }
// auth.show = () =>{
//     return new Promise((resolve, reject) => {
//         pool.query('Select * from auth', 
//          (err,results) =>{
//             if(err)
//             return reject(err);
//             return resolve(results);
//         });
//     });
// }
module.exports = auth