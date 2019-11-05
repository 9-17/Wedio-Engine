const mysql = require("mysql")
const connection = mysql.createConnection({
    host: "localhost",
    user: "wedio",
    password: "ballbot3451!",
    database: "wedio"
})
connection.connect()

const db = {
    conn: connection,

    queries: {
        AUTH_SIGNUP: "INSERT INTO wedio_users (auth_uuid, session_token, auth_provider, user_name, user_photo, user_email) VALUES(?,?,?,?,?,?)",
        AUTH_OBTAIN_SESS_TOKEN: "SELECT session_token FROM wedio_users WHERE auth_uuid = ? and auth_provider = ?",
        AUTH_OBTAIN_ACCOUNT: "SELECT * FROM wedio_users WHERE session_token = ?"
    }
}

module.exports = db