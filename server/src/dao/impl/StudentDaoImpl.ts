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
        })
    }

}

export default StudentDaoImpl