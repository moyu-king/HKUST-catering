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

    findByDate(date: number): Promise<Coupon[]> {
        this.sql = 'select * from coupon where expireIn > ?'
        this.sqlParams = [date]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: Coupon[]) => {
                if (err) reject(err)
                else resolve(result)
            })
            this.connection.end()
        })
    }

    findStudentCoupons(student_id: string): Promise<Coupon[]> {
        this.sql = 'select sc.id, sc.status, c.* from student_coupon sc inner join coupon c on sc.coupon_id = c.coupon_id where sc.student_id = ?'
        this.sqlParams = [student_id]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: any[]) => {
                if (err) reject(err)
                else resolve(result)
            })
            this.connection.end()
        })
    }

    findAvailableCountByStudentsId(student_id): Promise<number> {
        this.sql = 'select count(*) count from student_coupon where student_id = ? and status = ?'
        this.sqlParams = [student_id, 1]
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: any[]) => {
                if (err) reject(err)
                else resolve(result[0].count)
            })
            this.connection.end()
        })
    }

    updateStatusById(student_id: string, coupon_id: string): Promise<boolean> {
        this.sql = 'update student_coupon set status = ? where student_id = ? and coupon_id = ?'
        this.sqlParams = [0, student_id, coupon_id]

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