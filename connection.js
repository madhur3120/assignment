var mysql=require('mysql');

var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'madhur',
    database:'assignment'
});

module.exports=con;