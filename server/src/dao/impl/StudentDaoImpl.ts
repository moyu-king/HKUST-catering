import StudentDao from "../StudentDao";
import Student from "../../model/Student";
import DBUtil from "../../utils/DBUtil";

class StudentDaoImpl implements StudentDao {
    connection = null
    sql: string
    sqlParams: any[]

    constructor() {
        this.connection = DBUtil.createConnection()
        this.connection.connect()
    }

    findByStudentId(studentId: string): Promise<Student> {
        this.sql = 'select * from student where student_id = ?'
        this.sqlParams = [studentId]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: Student[]) => {
                if (err) reject(err)
                else if (result?.length) {
                    resolve(result[0])
                } else {
                    resolve(null)
                }
            })
            this.connection.end()
        })
    }

    updateInfoByStudentId(studentId: string, name: string, phone: string, address: string): Promise<boolean> {
        this.sql = 'update student set name = ?, phone = ?, address = ? where student_id = ?'
        this.sqlParams = [name, phone, address, studentId]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })
            this.connection.end()
        })
    }

    insertOnce(studentId: string, name: string, password: string, wallet: number): Promise<boolean> {
        this.sql = 'insert into student(student_id, name, password, wallet) values (?, ?, ?, ?)'
        this.sqlParams = [studentId, name, password, wallet]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })
            this.connection.end()
        })
    }

    findPaymentPassByStudentId(studentId: string): Promise<string> {
        this.sql = 'select payment_password from student where student_id = ?'
        this.sqlParams = [studentId]
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: Student[]) => {
                if (err) reject(err)
                else resolve(result[0].payment_password)
            })
            this.connection.end()
        })
    }

    findCountByStudentId(studentId: string): Promise<number> {
        this.sql = 'select count(*) count from student where student_id = ?'
        this.sqlParams = [studentId]
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: any[]) => {
                if (err) reject(err)
                else resolve(result[0].count)
            })
            this.connection.end()
        })
    }

    updatePaymentPass(studentId: string, payment_password: string): Promise<boolean> {
        this.sql = 'update student set payment_password = ? where student_id = ?'
        this.sqlParams = [payment_password, studentId]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })
            this.connection.end()
        })
    }

    updateWalletById(studentId: string, price: number): Promise<boolean> {
        this.sql = 'update student set wallet = wallet + ? where student_id = ?'
        this.sqlParams = [price, studentId]

        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, err => {
                if (err) reject(err)
                else resolve(true)
            })
            this.connection.end()
        })
    }

    findWalletById(studentId: string): Promise<number> {
        this.sql = 'select wallet from student where student_id = ?'
        this.sqlParams = [studentId]
        return new Promise((resolve, reject) => {
            this.connection.query(this.sql, this.sqlParams, (err, result: any[]) => {
                if (err) reject(err)
                else {
                    resolve(result[0].wallet)
                }
            })
            this.connection.end()
        })
    }

}

export default StudentDaoImpl