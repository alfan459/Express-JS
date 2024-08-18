// digunakan untuk mengkoneksikan ke database
const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "percobaan backend"
})


module.exports = db