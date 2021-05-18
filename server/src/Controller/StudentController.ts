import StudentService from "../service/StudentService";
import StudentServiceImpl from "../service/impl/StudentServiceImpl";
import LoginEnum from "../enum/LoginEnum";
import HttpUtil from "../utils/HttpUtil";
import ConstantUtil from "../utils/ConstantUtil";
import Student from "../model/Student";
import RegisterEnum from "../enum/RegisterEnum";
import FoodMenuService from "../service/FoodMenuService";
import FoodMenuServiceImpl from "../service/impl/FoodMenuServiceImpl";
import FoodMenu from "../model/FoodMenu";
import CouponServiceImpl from "../service/impl/CouponServiceImpl";
import CouponService from "../service/CouponService";
import Coupon from "../model/Coupon";
import OrderService from "../service/OrderService";
import OrderServiceImpl from "../service/impl/OrderServiceImpl";
import Order from "../model/Order";

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

        const couponService: CouponService = new CouponServiceImpl()
        const couponsCount: number | boolean = await couponService.getAvailableStudentCouponsNumber(studentId)
        if (student && typeof couponsCount === 'number') {
            res.send(HttpUtil.resBody(1, 'ok', {
                avatar: student.avatar,
                studentId: student.student_id,
                username: student.name,
                phone: student.phone,
                address: student.address,
                wallet: student.wallet,
                couponsCount: couponsCount,
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

    public static async getFoods(req: any, res: any): Promise<void> {
        const foodMenuService: FoodMenuService = new FoodMenuServiceImpl()
        const foodMenu: boolean | FoodMenu[] = await foodMenuService.getFoodMenu()

        if (foodMenu) {
            res.send(HttpUtil.resBody(1, 'ok', foodMenu as FoodMenu[]))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async getIssueCoupon(req: any, res: any): Promise<void> {
        const couponService: CouponService = new CouponServiceImpl()
        const result: Coupon[] = await couponService.getIssueCoupons()

        if (!result) {
            res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ""))
        } else {
            res.send(HttpUtil.resBody(1, 'ok', result))
        }
    }

    public static async getStudentCoupon(req: any, res: any): Promise<void> {
        const student_id: string = req.currentStudentId
        const couponService: CouponService = new CouponServiceImpl()

        const result: Coupon[] = await couponService.getStudentCoupons(student_id)

        if (!result) {
            res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ""))
        } else {
            res.send(HttpUtil.resBody(1, 'ok', result))
        }
    }

    public static async addCoupon(req: any, res: any): Promise<void> {
        const student_id: string = req.currentStudentId
        const coupon_id: string = req.body.coupon_id
        const couponService: CouponService = new CouponServiceImpl()

        const result: boolean = await couponService.getCoupon(coupon_id, student_id)
        if (result) {
            res.send(HttpUtil.resBody(1, '领取成功！', ''))
        } else {
            res.status(500).send(HttpUtil.resBody(0, '服务器出现未知错误！', ''))
        }
    }

    public static async isStudentPaymentExist(req: any, res: any): Promise<void> {
        const student_id: string = req.currentStudentId
        const studentService: StudentService = new StudentServiceImpl()

        const result: boolean | number = await studentService.getPaymentPass(student_id)

        if (typeof result === 'number') {
            res.status(500).send(HttpUtil.resBody(0, '服务器出现未知错误！', ''))
        } else {
            res.send(HttpUtil.resBody(1, 'ok', {isExist: result}))
        }
    }

    public static async validatePaymentPass(req: any, res: any): Promise<void> {
        const student_id: string = req.currentStudentId
        const payment_password: string = req.body.payment_password
        const regExp: RegExp = new RegExp('^\\d{6}$')
        if (!regExp.test(payment_password)) {
            res.status(400).send(HttpUtil.resBody(0, '当前请求服务器无法处理', ''))
        }

        const studentService: StudentService = new StudentServiceImpl()
        const result: boolean | number = await studentService.validatePaymentPass(student_id, payment_password)

        if (typeof result === 'number') {
            res.status(500).send(HttpUtil.resBody(0, '服务器出现未知错误！', ''))
        } else if (!result) {
            res.send(HttpUtil.resBody(0, '密码错误', ''))
        } else {
            res.send(HttpUtil.resBody(1, '验证成功', ''))
        }
    }

    public static async updatePaymentPass(req: any, res: any): Promise<void> {
        const student_id: string = req.currentStudentId
        const payment_password: string = req.body.payment_password
        //过滤
        const regExp: RegExp = new RegExp('^\\d{6}$')
        if (!regExp.test(payment_password)) {
            res.status(400).send(HttpUtil.resBody(0, '当前请求服务器无法处理', ''))
        }

        const studentService: StudentService = new StudentServiceImpl()
        const result: boolean | number = await studentService.updatePaymentPass(student_id, payment_password)

        if (result) {
            res.send(HttpUtil.resBody(1, 'ok', ''))
        } else {
            res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async getOrderType(req: any, res: any): Promise<void> {
        const orderService: OrderService = new OrderServiceImpl()
        const orderTypes: number[] = await orderService.getOrderType()

        if (orderTypes) {
            res.send(HttpUtil.resBody(1, 'ok', orderTypes))
        } else {
            res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async getOrder(req: any, res: any): Promise<void> {
        const studentId: string = req.currentStudentId
        //记录服务器状态
        let flag: boolean

        const orderService: OrderService = new OrderServiceImpl()
        const orders: Order[] = await orderService.getStudentOrders(studentId)
        let orderFoods: any[] = []

        if (orders) {
            const orderIds: string[] = orders.map(order => order.order_id)
            orderFoods = await orderService.getStudentOrderFoods(orderIds)
            flag = !!orderFoods
        } else {
            flag = !!orders
        }

        if (flag) {
            res.send(HttpUtil.resBody(1, 'ok', {orders, orderFoods}))
        } else {
            res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }

    public static async updateStudentWallet(req: any, res: any): Promise<void> {
        const price: number = req.body.price
        const student_id: string = req.currentStudentId
        const studentService: StudentService = new StudentServiceImpl()

        const wallet: number | boolean = await studentService.findStudentWallet(student_id)
        if (typeof wallet === 'number') {
            if (wallet < Math.abs(price)) {
                res.send(HttpUtil.resBody(0, "余额不足", ''))
            } else {
                const result: boolean = await studentService.updateStudentWallet(student_id, price)
                if (result) {
                    res.send(HttpUtil.resBody(1, 'ok', ''))
                } else {
                    res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
                }
            }
        } else {
            res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
    }
}

export default StudentController