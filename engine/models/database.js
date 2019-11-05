const mysql = require("mysql")
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "wedio",
    password: "ballbot3451!",
    database: "wedio"
})
connection.connect()

const db = {
    conn: connection,

    queries: {

    }
}