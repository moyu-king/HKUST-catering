import AdminService from "../service/AdminService";
import AdminServiceImpl from "../service/impl/AdminServiceImpl";
import HttpUtil from '../utils/HttpUtil'
import LoginEnum from "../enum/LoginEnum";
import ConstantUtil from "../utils/ConstantUtil";
import CouponService from "../service/CouponService";
import CouponServiceImpl from "../service/impl/CouponServiceImpl";
import FoodService from "../service/FoodService";
import FoodServiceImpl from "../service/impl/FoodServiceImpl";
import Admin from "../model/Admin";

class AdminController {
    public static async adminLogin(req: any, res: any): Promise<void> {
        const {username, password} = req.body
        const adminService: AdminService = new AdminServiceImpl()

        const result: LoginEnum | string = await adminService.login(username, password)

        switch (result) {
            case LoginEnum.serverErr:
                res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, null))
                break
            case LoginEnum.usernameErr:
                res.send(HttpUtil.resBody(0, '用户名不存在！', null))
                break
            case LoginEnum.passwordErr:
                res.send(HttpUtil.resBody(0, '密码错误！', null))
                break
            default:
                res.send(HttpUtil.resBody(1, '登录成功！', {token: result}))
                break
        }
    }

    public static async getAccountFlow(req: any, res: any): Promise<void> {
        const date = req.query.date

        const adminService: AdminService = new AdminServiceImpl()
        const result: any = await adminService.getAdminInfo(date)

        if (result) {
            res.send(HttpUtil.resBody(1, 'success', null))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, null))
        }
    }

    public static async getUserFlow(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async getAdminInfo(req: any, res: any): Promise<void> {
        const username = req.currentUseranme

        const adminService: AdminService = new AdminServiceImpl()
        const admin: Admin = await adminService.getAdminInfo(username)

        if (admin) {
            res.send(HttpUtil.resBody(1, 'success', null))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, null))
        }
    }

    public static async validatePass(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async modifyPass(req: any, res: any): Promise<void> {
        const {alias, phone, address, shop_name} = req.body
        res.send("hello world!");
    }

    public static async issueCoupon(req: any, res: any): Promise<void> {
        const {title, discount, limit, expireIn} = req.body
        const couponService: CouponService = new CouponServiceImpl()

        const result: boolean = await couponService.issueCoupon(title, discount, limit, expireIn)
        if (result) {
            res.send(HttpUtil.resBody(1, '优惠券发行成功！', null))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, null))
        }
    }

    public static async getFoodData(req: any, res: any): Promise<void> {
        res.send("hello world!");
    }

    public static async addNewFood(req: any, res: any): Promise<void> {
        const {food_name, price, type} = req.body
        const foodService: FoodService = new FoodServiceImpl()
        const result: boolean = await foodService.addFood(food_name, price, type)

        if (result) {
            res.send(HttpUtil.resBody(1, '菜式添加成功！', null))
        } else {
            res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, null))
        }
    }

}

export default AdminController;