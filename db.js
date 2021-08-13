const { promisify } = require('util');
const mysql = require('mysql');
const dump = require('mysqldump');

const db = mysql.createPool({
    user: 'user',
    password: 'password',
    host: 'localhost',
    database: 'db'
});

db.getConnection((err, connection)=>{
    if(err){
        console.log(err);
    }else{
        console.log('DATABASE CONNECTED!');
    }
});

db.query = promisify(db.query);

module.exports = db;