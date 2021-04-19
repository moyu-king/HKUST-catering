import FoodDao from "../FoodDao";
import Food from "../../model/Food";
import DBUtil from "../../utils/DBUtil";

class FoodDaoImpl implements FoodDao {
    connection = null
    sql: string
    sqlParams: Array<any>

    constructor() {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
    }

    addFood(food: Food): Promise<boolean> {
        this.sql = 'insert into food(food_id, food_name, price, image, type) values (?, ?)'
        this.sqlParams = [food.food_id, food.food_name, food.price, food.image, food.type]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })

            this.connection.end()
        })
    }

    addFoodToMenu(food_id: string, number: number, date: number): Promise<boolean> {
        this.sql = 'insert into food_menu(food_id, number, date) values (?, ?, ?)'
        this.sqlParams = [food_id, number, date]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })

            this.connection.end()
        })
    }

    updateFood(food: Food): Promise<boolean> {
        return Promise.resolve(false);
    }

    updateFoodMenuNum(number: number): Promise<boolean> {
        return Promise.resolve(false);
    }

}

export default FoodDaoImpl