import OderDao from "../OrderDao";
import Order from "../../model/Order";
import DBUtil from "../../utils/DBUtil";
import OrderFood from "../../model/OrderFood";

class OrderDaoImpl implements OderDao {
    connection = null
    sql: string
    sqlParams: Array<any>

    insertOnce(order: Order): Promise<boolean> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
        this.sql = 'insert into orders(order_id, student_id, admin_phone, price, create_time, order_type, status,discount) values (?, ?, ?, ?, ?, ?, ?, ?)'
        this.sqlParams = [order.order_id, order.student_id, order.admin_phone, order.price, order.create_time, order.order_type, order.status, order.discount]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })
            this.connection.end()
        })
    }

    queryAllOrderType(): Promise<number[]> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()

        this.sql = 'select * from order_type'
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, (err, result: number[]) => {
                if (err) reject(err)
                else resolve(result)
            })
            this.connection.end()
        })
    }

    insertOrderFood(foods: OrderFood[]): Promise<boolean> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()

        //sql
        const stringTemplate: string = '(?, ?, ?),'
        let paramString: string = ''
        for (let i = 0; i < foods.length; i++) {
            paramString += stringTemplate
        }
        paramString = paramString.slice(0, paramString.length - 1)
        this.sql = `insert into order_food(food_id, order_id, number) values ${paramString}`

        //sqlParams
        this.sqlParams = []
        foods.forEach(item => {
            this.sqlParams.push(item.food_id)
            this.sqlParams.push(item.order_id)
            this.sqlParams.push(item.number)
        })

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })
            this.connection.end()
        })
    }

    queryOrderByStudentId(studentId: string): Promise<Order[]> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()

        this.sql = 'select * from orders where student_id = ?'
        this.sqlParams = [studentId]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: Order[]) => {
                if (err) reject(err)
                else resolve(result)
            })
            this.connection.end()
        })
    }

    findOrderFoodByOrderId(orderId: string): Promise<any[]> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()

        this.sql = 'select o_f.number, o_f.order_id, f.* from order_food o_f inner join food f on o_f.food_id = f.food_id where order_id = ?'
        this.sqlParams = [orderId]
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: any[]) => {
                if (err) reject(err)
                else resolve(result)
            })
            this.connection.end()
        })
    }

    findNewOrderByStudentId(studentId: string): Promise<Order> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()

        this.sql = 'select * from orders where student_id = ? order by create_time desc'
        this.sqlParams = [studentId]
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: Order[]) => {
                if (err) reject(err)
                else resolve(result[0])
            })
            this.connection.end()
        })
    }

    queryOutstandingOrder(): Promise<Order[]> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()

        this.sql = 'select * from orders where status = 0'
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: Order[]) => {
                if (err) reject(err)
                else resolve(result)
            })
            this.connection.end()
        })
    }

    queryByPageAndDate(pageStart: number, pageSize: number, startTime: number, endTime: number): Promise<Order[]> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()

        this.sql = 'select * from orders where create_time between ? and ? limit ? offset ?'
        this.sqlParams = [startTime, endTime, pageSize, pageStart]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: Order[]) => {
                if (err) reject(err)
                else {
                    resolve(result)
                }
            })
            this.connection.end()
        })
    }

    queryCountByDate(startTime: number, endTime: number): Promise<number> {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
        this.sql = 'select count(*) count from orders where create_time between ? and ?'
        this.sqlParams = [startTime, endTime]
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: any[]) => {
                if (err) reject(err)
                else resolve(result[0].count)
            })
            this.connection.end()
        })
    }
}

export default OrderDaoImpl