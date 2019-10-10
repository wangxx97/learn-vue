const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost', //数据库地址
    user: 'root',  //账号 wxx
    password: '18698922221xX',
    port:'65532',
    database: 'wangxx',  //库名
    multipleStatements: true
});
conn.connect();
module.exports = conn;
