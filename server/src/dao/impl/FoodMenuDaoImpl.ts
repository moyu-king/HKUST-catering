import FoodMenuDao from "../FoodMenuDao";
import DBUtil from "../../utils/DBUtil";
import FoodMenu from "../../model/FoodMenu";

class FoodMenuDaoImpl implements FoodMenuDao {
    public connection = null
    sql: string
    sqlParams: Array<any>

    updateFoodMenuNumByFoodMenuId(number: number, food_menu_id: string): Promise<boolean> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
        this.sql = 'update food_menu set number = ? where food_menu_id = ?'
        this.sqlParams = [number, food_menu_id]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })

            this.connection.end()
        })
    }

    deleteFoodMenuById(food_menu_id: string): Promise<boolean> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
        this.sql = 'delete from food_menu where food_menu_id = ?'
        this.sqlParams = [food_menu_id]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })

            this.connection.end()
        })
    }

    addFoodMenu(food_menu_id: string, food_id: string, number: number, date: number): Promise<boolean> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
        this.sql = 'insert into food_menu(food_menu_id, food_id, number, date) values (?, ?, ?, ?)'
        this.sqlParams = [food_menu_id, food_id, number, date]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })

            this.connection.end()
        })
    }

    queryByDate(date): Promise<FoodMenu[]> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
        this.sql = 'select * from food_menu where date >= ?'
        this.sqlParams = [date]
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: FoodMenu[]) => {
                if (err) reject(err)
                else resolve(result)
            })

            this.connection.end()
        })
    }

    findByFoodIdAndDate(food_id: string, date: number): Promise<FoodMenu> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
        this.sql = 'select * from food_menu where food_id = ? and date = ?'
        this.sqlParams = [food_id, date]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: FoodMenu[]) => {
                if (err) reject(err)
                else if (result?.length !== 0) {//此处可能存在mysql服务意外关闭的情况，所以需要用？.
                    resolve(result[0])
                } else {
                    resolve(null)
                }
            })

            this.connection.end()
        })
    }

    updateFoodMenuNumByFoodId(number: number, food_id): Promise<boolean> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
        this.sql = 'update food_menu set number = ? where food_id = ?'
        this.sqlParams = [number, food_id]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })

            this.connection.end()
        })
    }
}

export default FoodMenuDaoImpl