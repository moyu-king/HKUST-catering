import FoodDao from "../FoodDao";
import Food from "../../model/Food";
import DBUtil from "../../utils/DBUtil";

class FoodDaoImpl implements FoodDao {
  connection = null;
  sql: string;
  sqlParams: Array<any>;

  addFood(food: Food): Promise<boolean> {
    this.connection = DBUtil.createConnection();
    this.connection.connect();

    this.sql =
      "insert into food(food_id, food_name, price, type, description, image) values (?, ?, ?, ?, ?, ?)";
    this.sqlParams = [
      food.food_id,
      food.food_name,
      food.price,
      food.type,
      food.description,
      food.image,
    ];

    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, this.sqlParams, (err) => {
        if (err) reject(err);
        else resolve(true);
      });

      this.connection.end();
    });
  }

  updateFood(food: Food): Promise<boolean> {
    this.connection = DBUtil.createConnection();
    this.connection.connect();

    this.sql =
      "update food set food_name = ?, price = ?, type = ? where food_id = ?";
    this.sqlParams = [food.food_name, food.price, food.type, food.food_id];

    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, this.sqlParams, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
      this.connection.end();
    });
  }

  queryAll(): Promise<Food[]> {
    this.connection = DBUtil.createConnection();
    this.connection.connect();

    this.sql = "select * from food";

    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, (err, result: Food[]) => {
        if (err) reject(err);
        else resolve(result);
      });

      this.connection.end();
    });
  }

  deleteById(food_id: string): Promise<boolean> {
    this.connection = DBUtil.createConnection();
    this.connection.connect();

    this.sql = "delete from food where food_id = ?";
    this.sqlParams = [food_id];

    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, this.sqlParams, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
      this.connection.end();
    });
  }

  findById(food_id: string): Promise<Food> {
    const connection = DBUtil.createConnection();
    connection.connect();

    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM food WHERE food_id = ?"
      const sqlParams = [food_id]

      connection.query(sql, sqlParams, (err, result: any[]) => {
        if (err) {
          connection.end();
          reject(err);
        } else if (result.length !== 0) {
          connection.end();
          resolve(result[0]);
        } else {
          connection.end()
          resolve(null)
        }
      });
    });
  }
}

export default FoodDaoImpl;
