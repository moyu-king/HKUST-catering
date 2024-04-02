import AdminDao from "../AdminDao";
import DBUtil from "../../utils/DBUtil";
import Admin from "../../model/Admin";

class AdminDaoImpl implements AdminDao {
  connection = null;
  sql: string;
  sqlParams: Array<any>;

  findByUsername(username: string): Promise<Admin> {
    this.connection = DBUtil.createConnection();
    this.connection.connect();

    this.sql = "select * from admin where username = ?";
    this.sqlParams = [username];

    return new Promise((resolve, reject) => {
      this.connection.query(
        this.sql,
        this.sqlParams,
        (err, result: Array<any>) => {
          if (err) reject(err);
          if (result.length !== 0) {
            const admin = new Admin();
            admin.username = result[0].username;
            admin.password = result[0].password;
            admin.avatar = result[0].avatar;
            admin.phone = result[0].phone;
            admin.address = result[0].address;
            admin.shop_name = result[0].shop_name;
            admin.alias = result[0].alias;
            resolve(admin);
          } else resolve(null);
          this.connection.end();
        }
      );
    });
  }

  updateInfoByUsername(admin: Admin): Promise<boolean> {
    this.connection = DBUtil.createConnection();
    this.connection.connect();

    this.sql =
      "update admin set shop_name = ?, alias = ?, phone = ?, address = ? where username = ?";
    this.sqlParams = [
      admin.shop_name,
      admin.alias,
      admin.phone,
      admin.address,
      admin.username,
    ];

    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, this.sqlParams, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
      this.connection.end();
    });
  }

  updatePassByUsername(username: string, password: string): Promise<boolean> {
    this.connection = DBUtil.createConnection();
    this.connection.connect();

    this.sql = "update admin set password = ? where username = ?";
    this.sqlParams = [password, username];

    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, this.sqlParams, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
      this.connection.end();
    });
  }

  updateAvatarByUsername(
    username: string,
    uploadPath: string
  ): Promise<boolean> {
    this.connection = DBUtil.createConnection();
    this.connection.connect();

    this.sql = "update admin set avatar = ? where username = ?";
    this.sqlParams = [uploadPath, username];

    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, this.sqlParams, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
      this.connection.end();
    });
  }

  findFirstOnce(): Promise<Admin> {
    this.connection = DBUtil.createConnection();
    this.connection.connect();

    this.sql = "select * from admin limit 1 offset 0";
    return new Promise((resolve, reject) => {
      this.connection.query(
        this.sql,
        this.sqlParams,
        (err, result: Admin[]) => {
          if (err) reject(err);
          else resolve(result[0]);
        }
      );
      this.connection.end();
    });
  }
}

export default AdminDaoImpl;
