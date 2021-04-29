import StudentService from "../StudentService";
import LoginEnum from "../../enum/LoginEnum";
import StudentDao from "../../dao/StudentDao";
import StudentDaoImpl from "../../dao/impl/StudentDaoImpl";
import Student from "../../model/Student";
import JWTUtil from "../../utils/JWTUtil";
import ConstantUtil from "../../utils/ConstantUtil";
import RegisterEnum from "../../enum/RegisterEnum";

class StudentServiceImpl implements StudentService {
    private studentDao: StudentDao

    constructor() {
        this.studentDao = new StudentDaoImpl()
    }

    async login(studentId: string, password: string): Promise<LoginEnum | string> {
        try {
            const student: Student = await this.studentDao.findByStudentId(studentId)
            if (!student) {
                return LoginEnum.usernameErr
            } else if (student.password !== password) {
                return LoginEnum.passwordErr
            } else {
                return JWTUtil.generate({studentId: student.student_id})
            }
        } catch (e) {
            return LoginEnum.serverErr
        }
    }

    async getStudentInfo(studentId: string): Promise<Student> {
        try {
            const student: Student = await this.studentDao.findByStudentId(studentId)
            if (!student.avatar) {
                student.avatar = `${ConstantUtil.staticDir()}/HKUST/profile/default.png`

                return student
            }
        } catch (e) {
            return null
        }
    }

    async register(studentId: string, name: string, password: string): Promise<RegisterEnum> {
        try {
            const student: Student = await this.studentDao.findByStudentId(studentId)
            if (!student?.student_id) {
                const wallet: number = 0
                await this.studentDao.insertOnce(studentId, name, password, wallet)
                return RegisterEnum.success
            } else {
                return RegisterEnum.usernameExist
            }
        } catch (e) {
            return RegisterEnum.serverErr
        }


    }

    async updateStudentInfo(studentId: string, username: string, phone: string, address: string): Promise<boolean> {
        return await this.studentDao.updateInfoByStudentId(studentId, username, phone, address).catch(() => false)
    }

}

export default StudentServiceImpl