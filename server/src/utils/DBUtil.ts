import * as mysql from 'mysql2'

class DBUtil {
  public static createConnection() {
    return mysql.createConnection({
      host: '127.0.0.1', //ip地址
      user: 'root',
      password: '187765', //mysql密码,
      port: 3306,
      database: 'order_food',
      charset: 'utf8mb4',
    })
  }
}

export default DBUtil
