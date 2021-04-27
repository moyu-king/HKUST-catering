import CouponDao from "../CouponDao";
import DBUtil from "../../utils/DBUtil";
import Coupon from "../../model/Coupon";

class CouponDaoImpl implements CouponDao {
    connection = null
    sql: string
    sqlParams: Array<any>

    constructor() {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
    }

    addCoupon(coupon: Coupon): Promise<boolean> {
        this.sql = 'insert into coupon(coupon_id, title, discount, use_limit, create_time, expireIn) values (?, ?, ?, ?, ?, ?)'
        this.sqlParams = [coupon.coupon_id, coupon.title, coupon.discount, coupon.limit, coupon.create_time, coupon.expireIn]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })

            this.connection.end()
        })
    }

    addCouponToStudent(coupon_id: string, student_id: string): Promise<boolean> {
        this.sql = 'insert into student_coupon(coupon_id, student_id) values (?, ?)'
        this.sqlParams = [coupon_id, student_id]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })

            this.connection.end()
        })
    }

}

export default CouponDaoImpl