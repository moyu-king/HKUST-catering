import StudentService from "../service/StudentService";
import StudentServiceImpl from "../service/impl/StudentServiceImpl";
import LoginEnum from "../enum/LoginEnum";
import HttpUtil from "../utils/HttpUtil";
import ConstantUtil from "../utils/ConstantUtil";
import Student from "../model/Student";
import RegisterEnum from "../enum/RegisterEnum";

class StudentController {
    public static async login(req: any, res: any): Promise<void> {
        const {studentId, password} = req.body
        const studentService: StudentService = new StudentServiceImpl()

        const result: string | LoginEnum = await studentService.login(studentId, password)
        switch (result) {
            case LoginEnum.serverErr:
                res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
                break
            case LoginEnum.usernameErr:
                res.send(HttpUtil.resBody(0, '学号错误', ''))
                break
            case LoginEnum.passwordErr:
                res.send(HttpUtil.resBody(0, '密码错误！', ''))
                break
            default:
                res.send(HttpUtil.resBody(1, '登录成功！', {token: result}))
                break
        }
    }

    public static async register(req: any, res: any): Promise<void> {
        const {studentId, name, password} = req.body
        const studentService: StudentService = new StudentServiceImpl()

        const result: RegisterEnum = await studentService.register(studentId, name, password)
        switch (result) {
            case RegisterEnum.serverErr:
                res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
                break
            case RegisterEnum.usernameExist:
                res.send(HttpUtil.resBody(0, '学号已注册', ''))
                break
            case RegisterEnum.success:
                res.send(HttpUtil.resBody(1, '注册成功', ''))
                break
        }
    }

    public static async getUserInfo(req: any, res: any): Promise<void> {
        const studentId: string = req.currentStudentId
        const studentService: StudentService = new StudentServiceImpl()

        const student: Student = await studentService.getStudentInfo(studentId)

        if (student) {
            res.send(HttpUtil.resBody(1, 'ok', {
                avatar: student.avatar,
                studentId: student.student_id,
                username: student.name,
                phone: student.phone,
                address: student.address,
                wallet: student.wallet,
                coupon: 0,
                order: 0
            }))
        } else {
            res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async updateUserInfo(req: any, res: any): Promise<void> {
        const studentId: string = req.currentStudentId
        const {username, phone, address} = req.body
        const studentService: StudentService = new StudentServiceImpl()

        const result: boolean = await studentService.updateStudentInfo(studentId, username, phone, address)
        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

}

export default StudentController